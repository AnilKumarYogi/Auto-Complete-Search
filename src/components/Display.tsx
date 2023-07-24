import "./card.css";
type user = {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
};

type Props = {
  person: user;
};

const Display = (props: Props): JSX.Element => {
  const { person } = props;
  return (
    <div className="imgHelp" key={person.id}>
      <img className="imgadjust" src={person.image} alt="picOfPerson " />
      {person.firstName} {person.lastName}
    </div>
  );
};

export default Display;
