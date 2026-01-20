import { useReducer } from "react";
import StepStart from "./StepStart";
import StepInput from "./StepInput";
import StepOutline from "./StepOutline";
import StepKeywordInsights from "./StepKeywordInsights";
import StepArticle from "./StepArticle";
import StepImage from "./StepImage";
import StepComplete from "./StepComplete";
import type { ArticleData } from "../../utils/mockApi";

export interface WizardState {
  step: number;
  keyword: string;
  genre: string;
  length: number;
  insights: {
    keyword: string;
    intent: "Informational" | "Commercial" | "Transactional";
    audience: string;
  }[];
  selectedInsight?: {
    keyword: string;
    intent: "Informational" | "Commercial" | "Transactional";
    audience: string;
  };
  outline: string[];
  article: ArticleData;
  images: string[];
}

type Action =
  | { type: "SET_STEP"; step: number }
  | { type: "SET_INPUTS"; keyword: string; genre: string; length: number }
  | {
      type: "SET_INSIGHTS";
      insights: WizardState["insights"];
      selected?: WizardState["selectedInsight"];
    }
  | { type: "SET_OUTLINE"; outline: string[] }
  | { type: "SET_ARTICLE"; article: ArticleData }
  | { type: "SET_IMAGES"; images: string[] }
  | { type: "RESET" };

const initialState: WizardState = {
  step: 0,
  keyword: "AI×業務効率化",
  genre: "AI",
  length: 2000,
  insights: [],
  selectedInsight: undefined,
  outline: [],
  article: { title: "", sections: [] },
  images: [],
};

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_INPUTS":
      return {
        ...state,
        keyword: action.keyword,
        genre: action.genre,
        length: action.length,
      };
    case "SET_INSIGHTS":
      return {
        ...state,
        insights: action.insights,
        selectedInsight: action.selected ?? state.selectedInsight,
      };
    case "SET_OUTLINE":
      return { ...state, outline: action.outline };
    case "SET_ARTICLE":
      return { ...state, article: action.article };
    case "SET_IMAGES":
      return { ...state, images: action.images };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

type WizardProps = {
  onComplete: (payload: {
    article: ArticleData;
    images: string[];
    keyword: string;
    genre: string;
    length: number;
  }) => void;
};

export default function Wizard({ onComplete }: WizardProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stepLabel = `Step ${state.step} / 6`;
  const effectiveKeyword =
    state.selectedInsight?.keyword ?? state.keyword;

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/50">
        <span>AI Auto Article Wizard</span>
        <span>{stepLabel}</span>
      </div>
      <div className="rounded-2xl border border-white/10 bg-panel p-6 shadow-xl">
        {state.step === 0 && (
          <StepStart onNext={() => dispatch({ type: "SET_STEP", step: 1 })} />
        )}
        {state.step === 1 && (
          <StepInput
            keyword={state.keyword}
            genre={state.genre}
            length={state.length}
            onChange={(payload) => dispatch({ type: "SET_INPUTS", ...payload })}
            onNext={() => dispatch({ type: "SET_STEP", step: 2 })}
            onBack={() => dispatch({ type: "SET_STEP", step: 0 })}
          />
        )}
        {state.step === 2 && (
          <StepKeywordInsights
            state={state}
            onNext={(insights, selected) => {
              dispatch({ type: "SET_INSIGHTS", insights, selected });
              dispatch({ type: "SET_STEP", step: 3 });
            }}
            onBack={() => dispatch({ type: "SET_STEP", step: 1 })}
          />
        )}
        {state.step === 3 && (
          <StepOutline
            state={{
              ...state,
              keyword: effectiveKeyword,
            }}
            onBack={() => dispatch({ type: "SET_STEP", step: 2 })}
            onNext={(outline) => {
              dispatch({ type: "SET_OUTLINE", outline });
              dispatch({ type: "SET_STEP", step: 4 });
            }}
          />
        )}
        {state.step === 4 && (
          <StepArticle
            state={state}
            onBack={() => dispatch({ type: "SET_STEP", step: 3 })}
            onNext={(article) => {
              dispatch({ type: "SET_ARTICLE", article });
              dispatch({ type: "SET_STEP", step: 5 });
            }}
          />
        )}
        {state.step === 5 && (
          <StepImage
            state={state}
            onNext={(images) => {
              dispatch({ type: "SET_IMAGES", images });
              dispatch({ type: "SET_STEP", step: 6 });
            }}
          />
        )}
        {state.step === 6 && (
          <StepComplete
            onComplete={() =>
              onComplete({
                article: state.article,
                images: state.images,
                keyword: state.keyword,
                genre: state.genre,
                length: state.length,
              })
            }
            onReset={() => dispatch({ type: "RESET" })}
          />
        )}
      </div>
    </div>
  );
}
