// STEP 3 - SMALL PURE FUNCTIONS.
// A "pure" function takes input and returns output, nothing else. They are the easiest code to test.

// FC12 in the spec: amounts are XAF, whole numbers. 412600000 becomes "412 600 000"
export function formatXAF(amount: number): string {
    return Math.round(amount)
        .toLocaleString("fr-FR")
        .replace(/\u202f|\u00a0/g, " ");
}

export function formatUnits(units: number): string {
    return Math.round(units).toLocaleString("fr-FR").replace(/\u202f|\u00a0/g, " ");
}

// FP4: the page must show WHEN the analysis was calculated.
export function formatDateTime(iso: string): string {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(iso));
}
