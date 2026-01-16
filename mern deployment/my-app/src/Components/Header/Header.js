import Reload from "./Reload";
import Title from "./Title";

export default function Header() {
  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '5px',
    }}>
      <Reload />
      <Title />
    </div>
  );
}
