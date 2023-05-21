import './card.css';
type user = {
    id:number,
    firstName:string,
    lastName:string,
    image:string
}

type Props = {
    person:user,
    // active:number
}

const Display=(props:Props):JSX.Element =>{
    const {person}=props;
    // if(person===active){
    //     return(
    //         <div className="card">
    //             <div className='imgHelp' key={person.id}>
    //             <img className="imgadjust" src={person.image} alt="Image" />
    //             {person.firstName} {person.lastName}
    //             </div>
    //         </div>
    //     );
    // }
    return(
        <div className='imgHelp' key={person.id}>
            <img className="imgadjust" src={person.image} alt="Image" />
            {person.firstName} {person.lastName}
        </div>
    );
}

export default Display;