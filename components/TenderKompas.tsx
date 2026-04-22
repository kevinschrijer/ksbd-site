"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ProfileKey =
  | "eerst-scherper-kiezen"
  | "proces-en-regie-versterken"
  | "onderscheidender-inschrijven"
  | "klaar-voor-de-volgende-stap";

type Answer = {
  label: string;
  score: number;
  signal?: ProfileKey;
};

type Question = {
  id: string;
  prompt: string;
  answers: Answer[];
};

type ProfileContent = {
  title: string;
  intro: string;
  meaning: string;
  focusPoints: string[];
  ctaText: string;
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    prompt: "Hoe vaak schrijven jullie in op aanbestedingen?",
    answers: [
      { label: "Af en toe, vooral als er iets voorbijkomt", score: 1 },
      { label: "Regelmatig, maar zonder vast ritme", score: 2 },
      { label: "Structureel en met duidelijke focus", score: 3 },
    ],
  },
  {
    id: "q2",
    prompt: "Hoe maak je meestal de keuze om wel of niet in te schrijven?",
    answers: [
      { label: "Vaak op gevoel of onder tijdsdruk", score: 1 },
      { label: "We kijken naar een aantal criteria, maar niet heel scherp", score: 2 },
      { label: "We maken bewust en onderbouwd een go/no-go keuze", score: 3 },
    ],
  },
  {
    id: "q3",
    prompt: "Hoe is het tenderproces intern georganiseerd?",
    answers: [
      { label: "Vrij ad hoc, het verschilt per traject", score: 1 },
      { label: "Er is een basisaanpak, maar die is niet altijd strak", score: 2 },
      { label: "Rollen, planning en proces zijn duidelijk ingericht", score: 3 },
    ],
  },
  {
    id: "q4",
    prompt: "Waar zit meestal de grootste uitdaging?",
    answers: [
      {
        label: "De juiste aanbestedingen kiezen",
        score: 1,
        signal: "eerst-scherper-kiezen",
      },
      {
        label: "Tijd, capaciteit en afstemming",
        score: 2,
        signal: "proces-en-regie-versterken",
      },
      {
        label: "Een overtuigend en onderscheidend plan schrijven",
        score: 3,
        signal: "onderscheidender-inschrijven",
      },
      {
        label: "Meer rendement halen uit een al stevige aanpak",
        score: 4,
        signal: "klaar-voor-de-volgende-stap",
      },
    ],
  },
  {
    id: "q5",
    prompt: "Hoe scherp is jullie onderscheidend vermogen in aanbestedingen?",
    answers: [
      { label: "Dat is vaak nog te algemeen of onvoldoende concreet", score: 1 },
      { label: "We hebben het redelijk scherp, maar het kan sterker", score: 2 },
      {
        label:
          "We kunnen duidelijk onderbouwen waarom een opdrachtgever voor ons moet kiezen",
        score: 3,
      },
    ],
  },
  {
    id: "q6",
    prompt: "Wanneer start de voorbereiding meestal echt?",
    answers: [
      { label: "Pas wanneer de aanbesteding gepubliceerd is", score: 1 },
      { label: "We proberen ons voor te bereiden zodra het concreet wordt", score: 2 },
      { label: "We zijn vroegtijdig bezig met positionering, informatie en strategie", score: 3 },
    ],
  },
];

const PROFILE_CONTENT: Record<ProfileKey, ProfileContent> = {
  "eerst-scherper-kiezen": {
    title: "Jouw uitkomst: Eerst scherper kiezen",
    intro: "De grootste winst ligt waarschijnlijk niet in vaker inschrijven, maar in gerichter kiezen.",
    meaning:
      "Jullie zien kansen in de markt, maar de keuze om wel of niet in te schrijven kan waarschijnlijk scherper. Daardoor gaat er energie naar trajecten die minder kansrijk zijn of minder goed passen.",
    focusPoints: [
      "Heldere go/no-go criteria formuleren",
      "Kansrijke aanvragen sneller herkennen",
      "Commerciële afwegingen beter verbinden met bidbeslissingen",
    ],
    ctaText:
      "Wil je scherper kiezen waar je wel en niet op inzet? In een kennismaking kijk ik graag met je mee.",
  },
  "proces-en-regie-versterken": {
    title: "Jouw uitkomst: Proces en regie versterken",
    intro:
      "De basis is aanwezig, maar de grootste winst zit waarschijnlijk in meer structuur, afstemming en grip.",
    meaning:
      "Jullie schrijven al met enige regelmaat in, maar het proces leunt nog sterk op improvisatie, druk op capaciteit of afhankelijkheid van enkele mensen. Dat maakt de kwaliteit kwetsbaar.",
    focusPoints: [
      "Rollen en verantwoordelijkheden verduidelijken",
      "Meer rust en regie in planning en samenwerking",
      "Kennis en input slimmer hergebruiken",
    ],
    ctaText:
      "Wil je meer grip op het tenderproces en constantere kwaliteit? Daar denk ik graag over mee.",
  },
  "onderscheidender-inschrijven": {
    title: "Jouw uitkomst: Onderscheidender inschrijven",
    intro:
      "De grootste kans ligt waarschijnlijk in een scherper verhaal en overtuigender positionering.",
    meaning:
      "Er staat al een werkbare basis, maar het verschil wordt nog niet altijd overtuigend zichtbaar in de inschrijving. Juist daar is vaak veel winst te behalen.",
    focusPoints: [
      "Onderscheidend vermogen concreter maken",
      "Klantwaarde sterker vertalen naar de offerte",
      "Planschrijvers en inhoud beter laten samenkomen",
    ],
    ctaText:
      "Wil je sterker laten zien waarom een opdrachtgever voor jullie moet kiezen? Laten we daar samen naar kijken.",
  },
  "klaar-voor-de-volgende-stap": {
    title: "Jouw uitkomst: Klaar voor de volgende stap",
    intro:
      "Jullie aanpak staat al behoorlijk stevig. De volgende winst zit in verfijnen, versnellen en strategisch uitbouwen.",
    meaning:
      "Er is duidelijk een fundament voor professioneel tenderen. Dat biedt ruimte om verder te optimaliseren op rendement, kwaliteit en impact.",
    focusPoints: [
      "Winstrategie verder aanscherpen",
      "Efficiënter werken zonder kwaliteitsverlies",
      "Tenderaanpak sterker verbinden aan commerciële doelen",
    ],
    ctaText:
      "Benieuwd waar voor jullie de volgende stap zit? In een kennismaking verken ik dat graag met je.",
  },
};

const MAX_RAW_SCORE = QUESTIONS.reduce(
  (sum, question) => sum + Math.max(...question.answers.map((answer) => answer.score)),
  0
);
const MIN_RAW_SCORE = QUESTIONS.reduce(
  (sum, question) => sum + Math.min(...question.answers.map((answer) => answer.score)),
  0
);

function normalizeScore(rawScore: number) {
  const normalized = ((rawScore - MIN_RAW_SCORE) / (MAX_RAW_SCORE - MIN_RAW_SCORE)) * 100;
  return Math.round(normalized);
}

function getBand(score: number) {
  if (score <= 34) {
    return {
      label: "Fundament",
      interpretation: "Er is veel te winnen met een scherper fundament",
    };
  }

  if (score <= 64) {
    return {
      label: "Aanscherpen",
      interpretation: "Er staat al iets, maar aanscherping levert direct winst op",
    };
  }

  return {
    label: "Doorpakken",
    interpretation: "De basis staat, de volgende stap zit in verfijning en rendement",
  };
}

function determineProfile(answers: number[], selectedAnswers: Answer[]): ProfileKey {
  const signals: Record<ProfileKey, number> = {
    "eerst-scherper-kiezen": 0,
    "proces-en-regie-versterken": 0,
    "onderscheidender-inschrijven": 0,
    "klaar-voor-de-volgende-stap": 0,
  };

  const [q1, q2, q3, q4, q5, q6] = answers;
  const totalScore = normalizeScore(selectedAnswers.reduce((sum, answer) => sum + answer.score, 0));

  if (selectedAnswers[3]?.signal) {
    signals[selectedAnswers[3].signal] += 4;
  }

  if (q2 === 1) {
    signals["eerst-scherper-kiezen"] += 3;
  }
  if (q1 === 1) {
    signals["eerst-scherper-kiezen"] += 1;
  }
  if (q6 === 1) {
    signals["eerst-scherper-kiezen"] += 1;
  }

  if (q3 === 1) {
    signals["proces-en-regie-versterken"] += 3;
  }
  if (q3 === 2) {
    signals["proces-en-regie-versterken"] += 2;
  }
  if (q4 === 2) {
    signals["proces-en-regie-versterken"] += 2;
  }

  if (q5 === 1) {
    signals["onderscheidender-inschrijven"] += 3;
  }
  if (q5 === 2) {
    signals["onderscheidender-inschrijven"] += 1;
  }
  if (q4 === 3) {
    signals["onderscheidender-inschrijven"] += 2;
  }
  if (q1 >= 2 && q3 >= 2 && q5 <= 2) {
    signals["onderscheidender-inschrijven"] += 1;
  }

  if (q2 === 3) {
    signals["klaar-voor-de-volgende-stap"] += 1;
  }
  if (q3 === 3) {
    signals["klaar-voor-de-volgende-stap"] += 1;
  }
  if (q6 === 3) {
    signals["klaar-voor-de-volgende-stap"] += 2;
  }
  if (q4 === 4) {
    signals["klaar-voor-de-volgende-stap"] += 3;
  }
  if (totalScore >= 70) {
    signals["klaar-voor-de-volgende-stap"] += 2;
  }

  if (totalScore <= 34) {
    signals["eerst-scherper-kiezen"] += 2;
  } else if (totalScore <= 64) {
    signals["proces-en-regie-versterken"] += 1;
    signals["onderscheidender-inschrijven"] += 1;
  } else {
    signals["klaar-voor-de-volgende-stap"] += 1;
  }

  return Object.entries(signals).sort((a, b) => b[1] - a[1])[0][0] as ProfileKey;
}

function CompassScoreBar({ score }: { score: number }) {
  const band = getBand(score);

  return (
    <div className="tk-score-wrap">
      <div className="tk-score-meta">
        <span className="tk-score-value">{score}/100</span>
        <span className="tk-score-band">{band.label}</span>
      </div>

      <div
        className="tk-score-track"
        role="meter"
        aria-label="Tenderkompas score"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={score}
      >
        <motion.div
          className="tk-score-fill"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="tk-score-scale" aria-hidden="true">
        <span>Fundament</span>
        <span>Aanscherpen</span>
        <span>Doorpakken</span>
      </div>
    </div>
  );
}

export default function TenderKompas() {
  const [step, setStep] = useState(0);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [animatedStep, setAnimatedStep] = useState(0);

  const currentQuestion = QUESTIONS[step];
  const selectedAnswers = selectedIndexes.map(
    (answerIndex, questionIndex) => QUESTIONS[questionIndex].answers[answerIndex]
  );

  const rawScore = selectedAnswers.reduce((sum, answer) => sum + answer.score, 0);
  const normalizedScore = useMemo(() => normalizeScore(rawScore), [rawScore]);
  const profile = useMemo(
    () =>
      selectedAnswers.length === QUESTIONS.length
        ? determineProfile(
            selectedAnswers.map((answer) => answer.score),
            selectedAnswers
          )
        : null,
    [selectedAnswers]
  );

  const progressPercentage = Math.round((Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100);
  const band = getBand(normalizedScore);

  useEffect(() => {
    if (step < QUESTIONS.length) {
      setAnimatedStep(step);
    }
  }, [step]);

  const handleAnswer = (answerIndex: number) => {
    const next = [...selectedIndexes];
    next[step] = answerIndex;
    setSelectedIndexes(next);

    if (step === QUESTIONS.length - 1) {
      setStep(QUESTIONS.length);
      return;
    }

    setStep((previous) => previous + 1);
  };

  const restart = () => {
    setSelectedIndexes([]);
    setStep(0);
    setAnimatedStep(0);
  };

  return (
    <section className="tk-shell" aria-labelledby="tenderkompas-title">
      <div className="tk-card">
        <div className="tk-header">
          <span className="tk-kicker">Tenderkompas</span>
          <h2 id="tenderkompas-title">Ontdek welke tenderaanpak past bij jouw organisatie</h2>
          <p>
            Schrijf je regelmatig in op aanbestedingen, maar wil je scherper kiezen, beter
            organiseren of overtuigender inschrijven? Met deze korte check krijg je inzicht in waar
            jouw grootste kans ligt.
          </p>
        </div>

        <div className="tk-progress" aria-label="Voortgang">
          <div className="tk-progress-top">
            <span>Voortgang</span>
            <span>
              {Math.min(step, QUESTIONS.length)} / {QUESTIONS.length}
            </span>
          </div>
          <div className="tk-progress-track" aria-hidden="true">
            <motion.div
              className="tk-progress-fill"
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step < QUESTIONS.length ? (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="tk-step"
            >
              <div className="tk-question-meta">
                <span className="tk-question-count">Vraag {animatedStep + 1}</span>
              </div>

              <h3>{currentQuestion.prompt}</h3>

              <div className="tk-answer-list" role="list" aria-label="Antwoordmogelijkheden">
                {currentQuestion.answers.map((answer, answerIndex) => (
                  <motion.button
                    key={answer.label}
                    type="button"
                    className="tk-answer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.995 }}
                    onClick={() => handleAnswer(answerIndex)}
                    aria-label={`Kies antwoord: ${answer.label}`}
                  >
                    <span>{answer.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            profile && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="tk-result"
              >
                <div className="tk-result-header">
                  <span className="tk-result-kicker">Jouw uitkomst</span>
                  <h3>{PROFILE_CONTENT[profile].title}</h3>
                  <p className="tk-result-intro">{PROFILE_CONTENT[profile].intro}</p>
                </div>

                <CompassScoreBar score={normalizedScore} />

                <p className="tk-score-interpretation">{band.interpretation}</p>

                <div className="tk-result-grid">
                  <section className="tk-result-block">
                    <h4>Wat dit aangeeft</h4>
                    <p>{PROFILE_CONTENT[profile].meaning}</p>
                  </section>

                  <section className="tk-result-block">
                    <h4>Waar nu de meeste winst zit</h4>
                    <div className="tk-focus-grid">
                      {PROFILE_CONTENT[profile].focusPoints.map((focusPoint) => (
                        <div key={focusPoint} className="tk-focus-card">
                          <span className="tk-focus-check" aria-hidden="true">
                            ✓
                          </span>
                          <span>{focusPoint}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <section className="tk-cta">
                  <p>{PROFILE_CONTENT[profile].ctaText}</p>
                  <div className="tk-cta-actions">
                    {/* Vervang deze URL later door je eigen kennismakingspagina of calendly-link */}
                    <a href="/contact" className="tk-button tk-button-primary">
                      Plan een kennismaking
                    </a>
                    {/* Vervang deze URL later door je eigen aanpakpagina */}
                    <a href="/aanpak" className="tk-button tk-button-secondary">
                      Bekijk mijn aanpak
                    </a>
                  </div>
                </section>

                <button type="button" className="tk-restart" onClick={restart}>
                  Opnieuw invullen
                </button>

                <p className="tk-disclaimer">
                  Deze uitkomst is bedoeld als eerste richting. In de praktijk spelen context, type
                  aanbesteding en organisatiedoelen natuurlijk ook een rol.
                </p>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .tk-shell {
          width: 100%;
        }

        .tk-card {
          padding: 32px;
          background: #faf8f4;
          color: #121212;
          box-shadow: 0 18px 60px rgba(15, 15, 15, 0.08);
          border: 1px solid rgba(18, 18, 18, 0.06);
        }

        .tk-header {
          max-width: 760px;
          margin-bottom: 28px;
        }

        .tk-kicker,
        .tk-result-kicker,
        .tk-question-count {
          display: inline-flex;
          align-items: center;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 0.82rem;
          font-weight: 700;
          color: #756f67;
        }

        .tk-header h2,
        .tk-step h3,
        .tk-result h3,
        .tk-result h4 {
          margin: 0;
          letter-spacing: -0.04em;
          line-height: 1.02;
        }

        .tk-header h2 {
          margin-top: 10px;
          font-size: clamp(2rem, 4vw, 3.2rem);
          max-width: 14ch;
        }

        .tk-header p {
          max-width: 64ch;
          margin: 16px 0 0;
          color: #5f5a54;
          font-size: 1.05rem;
          line-height: 1.7;
        }

        .tk-progress {
          margin-bottom: 26px;
        }

        .tk-progress-top {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 10px;
          color: #5f5a54;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .tk-progress-track,
        .tk-score-track {
          overflow: hidden;
          background: rgba(18, 18, 18, 0.08);
        }

        .tk-progress-track {
          height: 8px;
        }

        .tk-progress-fill,
        .tk-score-fill {
          height: 100%;
          background: linear-gradient(90deg, #1e1e1e 0%, #6a655e 100%);
        }

        .tk-step h3,
        .tk-result h3 {
          font-size: clamp(1.65rem, 3vw, 2.45rem);
          max-width: 18ch;
        }

        .tk-question-meta {
          margin-bottom: 14px;
        }

        .tk-answer-list {
          display: grid;
          gap: 12px;
          margin-top: 24px;
        }

        .tk-answer {
          width: 100%;
          padding: 18px 20px;
          border: 1px solid rgba(18, 18, 18, 0.1);
          background: #ffffff;
          text-align: left;
          font: inherit;
          color: #121212;
          cursor: pointer;
          transition:
            border-color 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease;
        }

        .tk-answer:hover,
        .tk-answer:focus-visible {
          outline: none;
          border-color: rgba(18, 18, 18, 0.28);
          box-shadow: 0 12px 26px rgba(15, 15, 15, 0.08);
          background: #fffdfa;
        }

        .tk-answer span {
          display: block;
          font-size: 1rem;
          line-height: 1.5;
          font-weight: 600;
        }

        .tk-result {
          display: grid;
          gap: 28px;
        }

        .tk-result-header {
          max-width: 760px;
        }

        .tk-result-intro {
          margin: 12px 0 0;
          color: #5f5a54;
          font-size: 1.05rem;
          line-height: 1.65;
        }

        .tk-score-wrap {
          display: grid;
          gap: 12px;
        }

        .tk-score-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .tk-score-value {
          font-size: clamp(1.6rem, 3vw, 2.35rem);
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .tk-score-band {
          color: #5f5a54;
          font-size: 0.98rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .tk-score-track {
          height: 18px;
        }

        .tk-score-scale {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          color: #756f67;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .tk-score-scale span:nth-child(2) {
          text-align: center;
        }

        .tk-score-scale span:last-child {
          text-align: right;
        }

        .tk-score-interpretation {
          margin: -10px 0 0;
          color: #5f5a54;
          font-size: 1rem;
          line-height: 1.6;
        }

        .tk-result-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .tk-result-block {
          padding: 22px;
          background: #ffffff;
          border: 1px solid rgba(18, 18, 18, 0.08);
        }

        .tk-result-block h4 {
          margin-bottom: 14px;
          font-size: 1.2rem;
        }

        .tk-result-block p {
          margin: 0;
          color: #5f5a54;
          line-height: 1.7;
        }

        .tk-focus-grid {
          display: grid;
          gap: 10px;
        }

        .tk-focus-card {
          display: grid;
          grid-template-columns: 22px 1fr;
          gap: 12px;
          align-items: start;
          padding: 14px 16px;
          background: #fcfbf8;
        }

        .tk-focus-check {
          display: inline-grid;
          place-items: center;
          width: 22px;
          height: 22px;
          background: #1e1e1e;
          color: #ffffff;
          font-size: 0.82rem;
          font-weight: 800;
        }

        .tk-cta {
          padding: 24px;
          background: linear-gradient(180deg, rgba(18, 18, 18, 0.04), rgba(18, 18, 18, 0));
          border: 1px solid rgba(18, 18, 18, 0.08);
        }

        .tk-cta p {
          max-width: 58ch;
          margin: 0 0 18px;
          color: #5f5a54;
          line-height: 1.7;
        }

        .tk-cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .tk-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 54px;
          padding: 0 22px;
          text-decoration: none;
          font-weight: 700;
          transition:
            transform 150ms ease,
            background 150ms ease,
            color 150ms ease,
            border-color 150ms ease;
        }

        .tk-button:hover,
        .tk-button:focus-visible {
          transform: translateY(-1px);
        }

        .tk-button-primary {
          background: #121212;
          color: #ffffff;
        }

        .tk-button-primary:hover,
        .tk-button-primary:focus-visible {
          background: #2b2b2b;
        }

        .tk-button-secondary {
          border: 1px solid rgba(18, 18, 18, 0.14);
          color: #121212;
          background: transparent;
        }

        .tk-button-secondary:hover,
        .tk-button-secondary:focus-visible {
          background: #ffffff;
        }

        .tk-restart {
          justify-self: start;
          padding: 0;
          border: 0;
          background: transparent;
          color: #5f5a54;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
        }

        .tk-restart:hover,
        .tk-restart:focus-visible {
          color: #121212;
          outline: none;
        }

        .tk-disclaimer {
          margin: -10px 0 0;
          color: #756f67;
          font-size: 0.92rem;
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .tk-card {
            padding: 24px;
          }

          .tk-result-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .tk-card {
            padding: 20px;
          }

          .tk-answer {
            padding: 16px 16px;
          }

          .tk-score-meta {
            flex-direction: column;
            align-items: flex-start;
          }

          .tk-cta-actions {
            flex-direction: column;
          }

          .tk-button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
