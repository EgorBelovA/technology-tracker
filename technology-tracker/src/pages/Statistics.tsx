import StatisticsComponent from '../components/Statistics';
import { useTechnologies } from '../hooks/useTechnologies';

export default function Statistics() {
  const { technologies } = useTechnologies();
  return (
    <div>
      <StatisticsComponent technologies={technologies} />
    </div>
  );
}
