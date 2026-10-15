import { memo, useEffect, useState } from 'react';
import './LoadingScreen.css';

function useLoopingProgress(active, durationMs = 1800) {
  const [progress, setProgress] = useState(0); 

  useEffect(() => {
    if (!active) return; // not loading -> do nothing
    let frameId;
    let startTime;
    const tick = (now) => {
      if (startTime === undefined) startTime = now;
      const t = ((now - startTime) % durationMs) / durationMs; // 0..1, repeats
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // ease in-out
      setProgress(eased * 100);
      frameId = requestAnimationFrame(tick); // schedule the next frame
    };
    frameId = requestAnimationFrame(tick);

    // Cleanup: runs when `active` flips to false OR the component unmounts.
    // Without this the animation would keep running in the background.
    return () => cancelAnimationFrame(frameId);
  }, [active, durationMs]);

  return progress;
}

/* -------------------------------------------------------------------------
   2. The static artwork (desk, laptop, plant, logo, headline...).
      It never changes, so memo() stops React from re-rendering it
      on every animation frame.
   ------------------------------------------------------------------------- */
const Illustration = memo(function Illustration() {
  return (
    <>
      <defs>
        {/* Two-tone leaf with midrib and side veins. Tip (0,-100), base (0,0). Colours come from the a, b and v custom properties */}
        <g id="sdl-leaf">
          <path d="M0 0C-30-25-37-68 0-100Z" style={{ fill: 'var(--a)' }} />
          <path d="M0 0C30-25 37-68 0-100Z" style={{ fill: 'var(--b)' }} />
          <path className="sdl-vein" strokeWidth="2.4" d="M0 3V-90" />
        </g>

        {/* Brand icon (70x70) */}
        <g id="sdl-logoicon">
          <use href="#sdl-leaf" transform="translate(36 62) rotate(-52) scale(.55 .42)" style={{ '--a': 'var(--ta)', '--b': 'var(--tb)', '--v': 'var(--veinc)' }} />
          <use href="#sdl-leaf" transform="translate(34 50) rotate(18) scale(.6 .52)" style={{ '--a': 'var(--oa)', '--b': 'var(--ob)', '--v': 'var(--veinc)' }} />
          <use href="#sdl-leaf" transform="translate(30 67) rotate(62) scale(.5 .42)" style={{ '--a': 'var(--da)', '--b': 'var(--db)', '--v': 'var(--veinc)' }} />
          <path d="M22 69C28 56 36 44 48 26" fill="none" stroke="var(--stemc)" strokeWidth="2.6" strokeLinecap="round" />
        </g>

        <pattern id="sdl-stripes" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <rect width="14" height="14" fill="var(--fill)" />
          <rect width="5" height="14" fill="var(--stripe)" />
        </pattern>
        <linearGradient id="sdl-gScr" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--scr1)' }} /><stop offset="1" style={{ stopColor: 'var(--scr2)' }} />
        </linearGradient>
        <linearGradient id="sdl-gStand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: 'var(--stand2)' }} /><stop offset=".45" style={{ stopColor: 'var(--stand1)' }} /><stop offset="1" style={{ stopColor: 'var(--stand2)' }} />
        </linearGradient>
        <linearGradient id="sdl-gGlare" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".38" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="sdl-monitorclip"><rect x="515" y="280" width="316" height="252" rx="12" /></clipPath>
      </defs>

      {/* Background (oversized so it fills any screen shape) */}
      <rect x="-3000" y="-3000" width="8000" height="8000" fill="var(--bg)" />

      {/* ============ LOGO ============ */}
      <g transform="translate(398 76)"><use href="#sdl-logoicon" /></g>
      <text x="486" y="127" fontSize="54" fontWeight="600" textLength="482" lengthAdjust="spacingAndGlyphs"><tspan fill="var(--ink)">StockDemand</tspan><tspan fill="var(--olive)">Lens</tspan></text>
      <text x="727" y="162" fontSize="13" fontWeight="500" fill="var(--tag)" textAnchor="middle" textLength="322" lengthAdjust="spacing">BETTER DATA. SMARTER DECISIONS.</text>

      {/* ============ ILLUSTRATION ============ */}
      <path className="sdl-blob" d="M262 520C255 420 300 350 380 320C450 290 500 250 600 240C680 235 720 270 760 300C800 330 880 320 960 345C1040 380 1085 480 1062 560C1046 602 1000 615 940 612L330 612C290 612 265 580 262 520Z" />
      <ellipse className="sdl-shadow" cx="880" cy="603" rx="125" ry="10" />

      <path className="sdl-dash" d="M735 260C770 238 850 232 886 268" />
      <path className="sdl-dash" d="M968 325C1000 340 1012 370 1012 396" />

      {/* cloud */}
      <path d="M870 331C852 331 851 305 872 303C873 282 896 275 909 285C919 265 951 269 954 293C971 295 972 321 956 331Z" fill="var(--sage)" opacity=".85" />
      <g stroke="var(--white)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M898 316V295M891 302 898 295 905 302" />
        <path d="M918 294V315M911 308 918 315 925 308" />
      </g>

      {/* desk */}
      <rect x="280" y="602" width="460" height="14" rx="7" fill="var(--desk)" />
      <path d="M683 602H733A7 7 0 0 1 733 616H683Z" fill="var(--desk2)" />

      {/* monitor window */}
      <rect x="515" y="280" width="316" height="252" rx="12" className="sdl-screen" />
      <g clipPath="url(#sdl-monitorclip)"><rect x="515" y="280" width="316" height="32" className="sdl-dkg" /></g>
      <circle cx="537" cy="296" r="4.5" fill="#fff" /><circle cx="554" cy="296" r="4.5" fill="#fff" /><circle cx="571" cy="296" r="4.5" fill="#fff" />

      <rect x="540" y="331" width="148" height="86" rx="6" fill="none" stroke="var(--screenline)" strokeWidth="1.5" />
      <rect x="550" y="392" width="12" height="18" rx="1.5" fill="var(--lgreen)" />
      <rect x="571" y="380" width="12" height="30" rx="1.5" fill="var(--lgreen)" />
      <rect x="592" y="363" width="14" height="47" rx="1.5" fill="var(--dkg2)" />
      <rect x="616" y="372" width="13" height="38" rx="1.5" fill="var(--olive)" />
      <rect x="639" y="356" width="13" height="54" rx="1.5" fill="var(--olive)" />
      <rect x="662" y="340" width="13" height="70" rx="1.5" fill="var(--dkg2)" />

      <g transform="translate(754 373)">
        <circle r="29.5" fill="none" stroke="var(--green)" strokeWidth="25" />
        <circle r="29.5" fill="none" stroke="var(--gold)" strokeWidth="25" strokeDasharray="81.5 185.4" transform="rotate(-90)" />
      </g>

      <circle cx="545" cy="438" r="5.5" fill="var(--dkg3)" /><circle cx="545" cy="456" r="5.5" fill="var(--sage)" />
      <circle cx="545" cy="474" r="5.5" fill="var(--gold)" /><circle cx="545" cy="492" r="5.5" fill="var(--sagelight)" />
      <path className="sdl-ln" d="M566 438H745" /><path className="sdl-ln" d="M566 456H757" /><path className="sdl-ln" d="M566 474H719" /><path className="sdl-ln" d="M566 492H757" />

      {/* server stack */}
      <rect x="808" y="454" width="130" height="146" rx="10" className="sdl-shadow" opacity=".7" />
      <g>
        <rect x="806" y="449" width="130" height="46" rx="8" className="sdl-dkg" />
        <rect x="806" y="499" width="130" height="45" rx="8" className="sdl-dkg" />
        <rect x="806" y="549" width="130" height="46" rx="8" className="sdl-dkg" />
        <g fill="var(--dkg2)" opacity=".55"><rect x="806" y="449" width="130" height="5" rx="2.5" /><rect x="806" y="499" width="130" height="5" rx="2.5" /><rect x="806" y="549" width="130" height="5" rx="2.5" /></g>
        <g stroke="#fff" strokeOpacity=".12" strokeWidth="2" strokeLinecap="round">
          <path d="M850 462V482M858 462V482M866 462V482" /><path d="M850 512V532M858 512V532M866 512V532" /><path d="M850 562V582M858 562V582M866 562V582" />
        </g>
        <g stroke="#0A2F25" strokeWidth="5" strokeLinecap="round" opacity=".7"><path d="M820 472H838" /><path d="M820 522H838" /><path d="M820 572H838" /></g>
        <g fill="#fff"><circle cx="883" cy="472" r="5" /><circle cx="883" cy="522" r="5" /><circle cx="883" cy="572" r="5" /></g>
        <g fill="var(--olive)"><circle cx="899" cy="472" r="4.5" /><circle cx="899" cy="522" r="4.5" /><circle cx="899" cy="572" r="4.5" /></g>
      </g>

      {/* analytics card */}
      <rect x="948" y="400" width="161" height="179" rx="10" className="sdl-shadow" opacity=".8" />
      <rect x="945" y="396" width="161" height="179" rx="10" className="sdl-card" />
      <path className="sdl-ln" d="M963 420H1035" strokeWidth="4" /><path className="sdl-ln" d="M963 436H1010" strokeWidth="4" />
      <polyline points="965,493 988,461 1011,479 1037,441 1058,459 1087,418" fill="none" stroke="var(--green)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <g fill="var(--dkg3)"><circle cx="965" cy="493" r="4.5" /><circle cx="988" cy="461" r="4.5" /><circle cx="1011" cy="479" r="4.5" /><circle cx="1037" cy="441" r="4.5" /><circle cx="1058" cy="459" r="4.5" /><circle cx="1087" cy="418" r="4.5" /></g>
      <path className="sdl-ln" d="M963 520H1032" strokeWidth="4" /><path className="sdl-ln" d="M963 536H1018" strokeWidth="4" /><path className="sdl-ln" d="M963 552H1021" strokeWidth="4" />
      <rect x="1047" y="517" width="18" height="43" rx="1.5" fill="var(--green)" />
      <rect x="1073" y="502" width="18" height="58" rx="1.5" fill="var(--gold)" />
      <rect x="1099" y="487" width="19" height="73" rx="1.5" fill="var(--olive)" />
      <path d="M1036 560H1122" stroke="var(--line)" strokeWidth="1.5" />

      {/* ===== laptop lid (screen faces viewer, as in the PNG) ===== */}
      <path d="M520 510H658L639 598H511Z" fill="var(--lid)" stroke="var(--lid)" strokeWidth="5" strokeLinejoin="round" />
      <path d="M527 516H653L636 592H518Z" fill="url(#sdl-gScr)" />
      <circle cx="589" cy="512.5" r="1.5" fill="var(--scr1)" />
      <g transform="translate(565 536) scale(.88)">
        <use href="#sdl-leaf" transform="translate(13 35) rotate(-6) scale(.34 .36)" style={{ '--a': '#FFFFFF', '--b': '#EEF5F0', '--v': 'rgba(19,77,60,.25)' }} />
        <use href="#sdl-leaf" transform="translate(21 33) rotate(26) scale(.36 .36)" style={{ '--a': '#93B976', '--b': '#7BA25F', '--v': 'rgba(15,64,52,.35)' }} />
        <use href="#sdl-leaf" transform="translate(20 38) rotate(64) scale(.3 .26)" style={{ '--a': '#FFFFFF', '--b': '#EEF5F0', '--v': 'rgba(19,77,60,.25)' }} />
      </g>

      {/* ===== plant (behind the man) ===== */}
      <path d="M350 426C347 446 346 466 348 488M342 458L347 470M362 474L350 485M338 502L347 488" fill="none" stroke="var(--p1b)" strokeWidth="2" strokeLinecap="round" />
      <use href="#sdl-leaf" transform="translate(338 502) rotate(-59) scale(.6 .52)" style={{ '--a': 'var(--p4a)', '--b': 'var(--p4b)', '--v': 'var(--veinc)' }} />
      <use href="#sdl-leaf" transform="translate(342 458) rotate(-39) scale(.67 .75)" style={{ '--a': 'var(--p1a)', '--b': 'var(--p1b)', '--v': 'var(--veinc)' }} />
      <use href="#sdl-leaf" transform="translate(362 474) rotate(38) scale(.6 .57)" style={{ '--a': 'var(--p3a)', '--b': 'var(--p3b)', '--v': 'var(--veinc)' }} />
      <use href="#sdl-leaf" transform="translate(350 426) rotate(25) scale(.58 .67)" style={{ '--a': 'var(--p2a)', '--b': 'var(--p2b)', '--v': 'var(--veinc)' }} />

      {/* ===== the man: seen from behind, head turned toward the screen ===== */}
      {/* shirt: back, shoulders and the arm reaching to the laptop */}
      <path d="M320 616L326 540C328 520 336 500 356 486C372 476 386 466 398 458L448 466C462 472 476 482 483 493C490 510 496 535 505 553C515 568 530 578 548 584L553 606C540 610 522 614 510 616Z" fill="var(--shirt)" />
      {/* darker sleeve, split from the back by the armhole seam */}
      <path d="M463 502C457 523 457 550 467 583C474 596 490 608 510 616L503 616C522 614 540 610 553 606L548 584C530 578 515 568 505 553C496 535 490 510 483 493C478 486 470 494 463 502Z" fill="var(--shirtarm)" />
      <path d="M463 502C457 523 457 550 467 583" fill="none" stroke="var(--shirt2)" strokeWidth="2.4" strokeLinecap="round" />
      {/* cuff */}
      <path d="M543 582L551 584L555 606L546 608Z" fill="var(--cuff)" />

      {/* neck and face (skin first, collar and hair go on top) */}
      <path d="M446 422C452 417 461 416 467 417L470 408C473 409 475 414 474 419C473 423 471 426 472 431C474 436 473 440 470 444C468 450 464 456 459 461C456 464 453 466 450 467L450 471L412 463L409 447L442 447L446 437Z" fill="var(--skin)" />
      <path d="M409 447H442L446 440L447 450C440 454 424 455 411 452Z" fill="var(--skin3)" />
      {/* collar */}
      <path d="M397 459C410 454 428 454 440 458C444 460 447 462 449 467C440 471 420 468 397 464Z" fill="var(--shirt3)" />
      <path d="M398 463C416 467 436 469 449 467" fill="none" stroke="var(--shirt2)" strokeWidth="2" strokeLinecap="round" />
      {/* hair */}
      <path d="M409 447C404 441 403 437 403 433C402 425 402 419 403 413C404 399 409 390 417 383C424 378 436 374 447 374C455 374 462 378 470 381C474 382 478 381.5 481 382C482 385 480 388 475 392C473 396 473 400 472 404C471 408 470 411 467 417C461 416 455 415 452 417C449 419 447 421 447 422C446 429 446 433 446 437C445 442 444 445 442 447Z" fill="var(--hair)" />
      {/* ear */}
      <path d="M450 419C456 415 461 421 460 429C459 435 456 439 452 438C449 436 448 428 450 419Z" fill="var(--skin)" stroke="var(--skin2)" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M452.5 423C456 423.5 456 431 453 434" fill="none" stroke="var(--skin2)" strokeWidth="2" strokeLinecap="round" />
      {/* chair back (in front of the man's lower back, as in the PNG) */}
      <path d="M298 616V545C298 533 306 527 316 527H396C410 527 418 534 422 548L437 616Z" fill="var(--chair)" />
      <path d="M417 545C421 552 422 560 424 570L437 616H425L413 556Z" fill="var(--chair2d)" />

      {/* laptop front edge, in front of the sleeve */}
      <rect x="463" y="597" width="175" height="5" rx="2.5" fill="var(--lid)" />

      {/* hand resting on top of the laptop */}
      <path d="M551 587C557 581 566 579 573 581C580 583 585 589 588 597L585 600.5C578 600 570 601.5 563 603L553 607Z" fill="var(--skin)" />
      <path d="M575 584C579 588 582 593 583 598M580 584C583 588 585.500 592 586 597" fill="none" stroke="var(--skin2)" strokeWidth="1.6" strokeLinecap="round" />

      {/* ============ HEADLINE ============ */}
      <text x="687" y="720" fontSize="50" fontWeight="700" fill="var(--ink)" textAnchor="middle">Analyzing your data...</text>
      <text x="687" y="782" fontSize="25" fill="var(--sub)" textAnchor="middle">We’re processing your information to give you</text>
      <text x="687" y="820" fontSize="25" fill="var(--sub)" textAnchor="middle">the most accurate insights.</text>
    </>
  );
});

/* -------------------------------------------------------------------------
   3. The progress bar. Its width comes from the `progress` prop.
   ------------------------------------------------------------------------- */
const BAR_X = 332;
const BAR_WIDTH = 655;

function ProgressBar({ progress }) {
  return (
    <>
      <rect x={BAR_X} y="872" width={BAR_WIDTH} height="33" rx="16.5" fill="var(--track)" />
      <rect
        x={BAR_X}
        y="872"
        width={(BAR_WIDTH * progress) / 100}
        height="33"
        rx="16.5"
        fill="url(#sdl-stripes)"
      />
      <text x="1020" y="898" fontSize="26" fontWeight="600" fill="var(--ink)">
        {Math.round(progress)}%
      </text>
    </>
  );
}

/* -------------------------------------------------------------------------
   4. The four steps. `stage` says which one is active:
      steps before it are done, the one at `stage` is active, the rest wait.
      stage = 4 means everything is done.
   ------------------------------------------------------------------------- */
const STEPS = [
  { label: 'Fetching data', cx: 430, labelX: 427 },
  { label: 'Processing', cx: 601, labelX: 601 },
  { label: 'Analyzing', cx: 771, labelX: 771 },
  { label: 'Finalizing', cx: 943, labelX: 944 },
];
const CONNECTORS = ['M478 976H553', 'M649 976H724', 'M819 976H894'];

function Steps({ stage }) {
  return (
    <>
      <g strokeLinecap="round">
        {CONNECTORS.map((d, i) => (
          <path key={d} d={d} strokeWidth="2" stroke={i < stage ? 'var(--dkg3)' : 'var(--ringlight)'} />
        ))}
      </g>

      {STEPS.map((step, i) => {
        const done = i < stage;
        const active = i === stage;
        return (
          <g key={step.label}>
            {done && (
              <>
                <circle cx={step.cx} cy="975" r="17" fill="var(--dkg3)" />
                <path
                  d="M-7 0L-2 5L8-5"
                  transform={`translate(${step.cx} 975)`}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            )}
            {active && (
              <>
                <circle cx={step.cx} cy="975" r="16" fill="var(--bg)" stroke="var(--ink)" strokeWidth="3.5" />
                <circle cx={step.cx} cy="975" r="7.5" fill="var(--ink)" />
              </>
            )}
            {!done && !active && (
              <circle cx={step.cx} cy="975" r="16" fill="none" stroke="var(--ringlight)" strokeWidth="3.5" />
            )}

            <text
              x={step.labelX}
              y="1025"
              fontSize="21"
              textAnchor="middle"
              fill={done || active ? 'var(--ink)' : 'var(--muted)'}
              fontWeight={active ? 600 : undefined}
              opacity={done ? 0.85 : undefined}
            >
              {step.label}
            </text>
          </g>
        );
      })}
    </>
  );
}

/* -------------------------------------------------------------------------
   5. The component you actually use.

   Props
     loading     true while the backend request is running
     stage       which step is active while loading (0-3). Default 0.
     onFinished  called ~0.5s after loading turns false, once the bar has
                 reached 100%, so you can swap to the real screen.
   ------------------------------------------------------------------------- */
export default function LoadingScreen({ loading, stage = 0, onFinished }) {
  const looping = useLoopingProgress(loading);

  // Still loading -> bar keeps looping. Data arrived -> bar snaps to 100%.
  const progress = loading ? looping : 100;
  const currentStage = loading ? stage : 4;

  // When loading ends, give the user a moment to see the full bar, then notify the parent.
  useEffect(() => {
    if (loading) return;
    const id = setTimeout(() => onFinished?.(), 500);
    return () => clearTimeout(id);
  }, [loading, onFinished]);

  return (
    <svg
      className="sdl-loader"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="227 50 920 1010"
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      role="img"
      aria-labelledby="sdl-title sdl-desc"
      aria-busy={loading}
    >
      <title id="sdl-title">StockDemandLens – Analyzing your data</title>
      <desc id="sdl-desc">
        Loading screen: a person working on a laptop beside a dashboard monitor, a server stack and an
        analytics card, with a progress bar.
      </desc>

      <Illustration />
      <ProgressBar progress={progress} />
      <Steps stage={currentStage} />
    </svg>
  );
}
