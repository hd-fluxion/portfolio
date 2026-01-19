import Wizard from "../components/wizard/Wizard";

type Props = {
  onComplete: (payload: {
    article: {
      title: string;
      sections: {
        h2: string;
        h3: string[];
        body: string;
      }[];
    };
    images: string[];
    keyword: string;
    genre: string;
    length: number;
  }) => void;
};

export default function WizardPage({ onComplete }: Props) {
  return <Wizard onComplete={onComplete} />;
}
