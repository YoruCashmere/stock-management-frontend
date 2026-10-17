import { useEffect, useState } from "react";
import type { ChangeEvent, CSSProperties, FormEvent } from "react";
import { isAxiosError } from "axios";

import {
    AtSign,
    BadgeCheck,
    Loader2,
    Mail,
    Pencil,
    Phone,
    User,
} from "lucide-react";
import Input from "../components/input.component";
import api from "../../api/axios";

// ---------------------------------------------------------------------------
// 1. Types
// ---------------------------------------------------------------------------
type ProfileForm = {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phone: string;
    birthDate: string; // YYYY-MM-DD
};

const emptyForm: ProfileForm = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    birthDate: "",
};

// ---------------------------------------------------------------------------
// 2. The round "bite" taken out of the top of the card (for the avatar)
//    Tweak these two numbers to resize it:
//      NOTCH_RADIUS = how big the round cut-out is
//      NOTCH_FILLET = how round the two corners where the card meets the cut are
// ---------------------------------------------------------------------------
const NOTCH_RADIUS = 114;
const NOTCH_FILLET = 20;

// Some geometry to draw that shape as a tiny SVG (you don't need to
// understand the maths, just know it draws "circle + smooth corners").
const dx = Math.sqrt((NOTCH_RADIUS + NOTCH_FILLET) ** 2 - NOTCH_FILLET ** 2);
const tx = (NOTCH_RADIUS * dx) / (NOTCH_RADIUS + NOTCH_FILLET);
const ty = (NOTCH_RADIUS * NOTCH_FILLET) / (NOTCH_RADIUS + NOTCH_FILLET);
const notchW = 2 * dx;
const notchH = NOTCH_RADIUS + 2;
const notchPath = [
    "M0 0",
    `A${NOTCH_FILLET} ${NOTCH_FILLET} 0 0 1 ${dx - tx} ${ty}`,
    `A${NOTCH_RADIUS} ${NOTCH_RADIUS} 0 0 0 ${dx + tx} ${ty}`,
    `A${NOTCH_FILLET} ${NOTCH_FILLET} 0 0 1 ${notchW} 0`,
    "Z",
].join(" ");
const notchSvg = `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${notchW}' height='${notchH}'><path d='${notchPath}'/></svg>`
)}")`;
const solid = "linear-gradient(#000, #000)";

// A CSS "mask" = a stencil. Layer 1 is the notch shape, layer 2 is a full
// rectangle. "exclude" removes the notch from the rectangle.
const cardMask: CSSProperties = {
    maskImage: `${notchSvg}, ${solid}`,
    maskSize: `${notchW}px ${notchH}px, 100% 100%`,
    maskPosition: "center top, 0 0",
    maskRepeat: "no-repeat",
    maskComposite: "exclude",
    WebkitMaskImage: `${notchSvg}, ${solid}`,
    WebkitMaskSize: `${notchW}px ${notchH}px, 100% 100%`,
    WebkitMaskPosition: "center top, 0 0",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskComposite: "xor",
};

// Faint hexagon lines for the page background (decoration only).
const hexPattern = `url("data:image/svg+xml,${encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'><g fill='none' stroke='#94a3b8' stroke-width='1'><path d='M28 66L0 50V16L28 0l28 16v34L28 66v34'/><path d='M28 0v34L0 50v34l28 16 28-16V50L28 34'/></g></svg>"
)}")`;

// ---------------------------------------------------------------------------
// 3. Small reusable pieces
// ---------------------------------------------------------------------------
function VerifiedBadge() {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 lg:text-base">
            <BadgeCheck size={18} />
            Verified
        </span>
    );
}

// type="submit": clicking it submits the <form>, same as pressing Enter.
function SaveButton({ isSaving }: { isSaving: boolean }) {
    return (
        <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-brand-deep disabled:cursor-not-allowed disabled:opacity-60 lg:text-base"
        >
            {isSaving ? (
                <Loader2 size={18} className="animate-spin" />
            ) : (
                <Pencil size={18} />
            )}
            {isSaving ? "Saving..." : "Save"}
        </button>
    );
}

// Shared pill look for every input. Note: only `pl-5` for the left side;
// Input adds the right padding itself so text never goes under the icon.
const fieldClass =
    "h-14 rounded-full border-2 border-slate-300 bg-brand-deep py-0 pl-5 text-base shadow-[inset_0_2px_5px_rgba(15,23,42,0.10)] lg:h-16 lg:text-xl";
const labelClass = "text-base text-slate-800 lg:text-lg";

// ---------------------------------------------------------------------------
// 4. The page
// ---------------------------------------------------------------------------
export default function AccountInformation() {
    const [form, setForm] = useState<ProfileForm>(emptyForm);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    // Load the profile once, when the component first appears.
    useEffect(() => {
        const controller = new AbortController();

        api.get("/profile", { signal: controller.signal }) // <-- your GET endpoint
            .then((res) => {
                const user = res.data;
                setForm({
                    firstName: user.firstName ?? "",
                    lastName: user.lastName ?? "",
                    userName: user.userName ?? "",
                    email: user.email ?? "",
                    phone: user.phone ?? "",
                    // if the API sends a full ISO date, keep only YYYY-MM-DD
                    birthDate: user.birthDate?.slice(0, 10) ?? "",
                });
            })
            .catch((err) => {
                if (isAxiosError(err) && err.code === "ERR_CANCELED") return;
                setStatus({ type: "error", message: "Could not load your profile." });
            })
            .finally(() => setIsLoading(false));

        return () => controller.abort();
    }, []);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setStatus(null);
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSaving(true);
        setStatus(null);

        try {
            // Email and phone are verified, so we don't send them.
            await api.patch("/profile", {
                // <-- your PATCH endpoint
                firstName: form.firstName,
                lastName: form.lastName,
                userName: form.userName,
                birthDate: form.birthDate,
            });
            setStatus({ type: "success", message: "Your changes were saved." });
        } catch (err) {
            const message =
                isAxiosError(err) && err.response?.data?.message
                    ? err.response.data.message
                    : "Something went wrong. Please try again.";
            setStatus({ type: "error", message });
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <main className="relative flex h-screen w-screen w-full items-center justify-center overflow-x-hidden px-4 py-10 sm:px-8 lg:px-12">
            {/* Decorative hexagon lines, fading out toward the bottom */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.14]"
                style={{
                    backgroundImage: hexPattern,
                    backgroundSize: "112px 200px",
                    maskImage: "linear-gradient(to bottom, #000, transparent 60%)",
                    WebkitMaskImage: "linear-gradient(to bottom, #000, transparent 60%)",
                }}
            />

            <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-16">
                <h1 className="text-center text-3xl font-semibold text-brand-deep lg:text-4xl">
                    Account Information
                </h1>

                {/* mt-28 leaves room for the avatar that pokes above the card */}
                <div className="relative mt-26 sm:mt-5">
                    <div className="drop-shadow-[0_8px_24px_rgba(15,23,42,0.10)]">
                        <form
                            onSubmit={handleSubmit}
                            aria-busy={isLoading}
                            className="rounded-[20px] bg-gradient-to-b from-white to-slate-50 px-6 pb-10 pt-36 sm:px-10 md:pt-[76px] lg:px-14 lg:pb-12"
                            style={cardMask}
                        >
                            <fieldset disabled={isLoading} className="min-w-0 ">
                                <div className="grid grid-cols-1 gap-x-11 gap-y-6 md:grid-cols-2 lg:gap-y-10">
                                    {/* Side padding on md+ leaves room for the avatar */}
                                    <div className="flex md:pr-12 lg:pr-24">
                                        <Input
                                            label="First Name"
                                            name="firstName"
                                            value={form.firstName}
                                            onChange={handleChange}
                                            icon={<User size={22} />}
                                            labelClassName={labelClass}
                                            className={fieldClass}
                                        />
                                    </div>

                                    <div className="flex md:pl-12 lg:pl-24">
                                        <Input
                                            label="Last Name"
                                            name="lastName"
                                            value={form.lastName}
                                            onChange={handleChange}
                                            icon={<User size={22} />}
                                            labelAction={<SaveButton isSaving={isSaving} />}
                                            labelClassName={labelClass}
                                            className={fieldClass}
                                        />
                                    </div>

                                    <Input
                                        label="Username"
                                        name="userName"
                                        value={form.userName}
                                        onChange={handleChange}
                                        icon={<AtSign size={22} />}
                                        autoComplete="username"
                                        labelClassName={labelClass}
                                        className={fieldClass}
                                    />

                                    <Input
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        icon={<Mail size={22} />}
                                        labelAction={<VerifiedBadge />}
                                        labelClassName={labelClass}
                                        className={fieldClass}
                                    />

                                    <Input
                                        label="Phone number"
                                        name="phone"
                                        type="tel"
                                        value={form.phone}
                                        onChange={handleChange}
                                        autoComplete="tel"
                                        icon={<Phone size={22} />}
                                        labelAction={<VerifiedBadge />}
                                        labelClassName={labelClass}
                                        className={fieldClass}
                                    />

                                    <Input
                                        label="Date of Birth"
                                        name="birthDate"
                                        type="date"
                                        value={form.birthDate}
                                        onChange={handleChange}
                                        labelClassName={labelClass}
                                        className={fieldClass}
                                    />
                                </div>
                            </fieldset>

                            {status && (
                                <p
                                    role="status"
                                    className={
                                        status.type === "success"
                                            ? "mt-6 text-center text-sm font-medium text-green-700"
                                            : "mt-6 text-center text-sm font-medium text-danger"
                                    }
                                >
                                    {status.message}
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Soft half-circle inside the bite */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-b-full border border-white/80 bg-gradient-to-b from-white/70 to-slate-100/30"
                        style={{ width: NOTCH_RADIUS * 2, height: NOTCH_RADIUS }}
                    />

                    {/* Avatar: centre sits on the card's top edge */}
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-slate-300 to-slate-400/70 p-2.5 shadow-[0_10px_30px_rgba(90,130,255,0.40)]">
                        <div className="rounded-full bg-white p-2.5">
                            <img
                                src="/assets/hero.png"
                                alt="Profile"
                                className="h-[120px] w-[120px] rounded-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
