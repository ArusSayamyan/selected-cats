const CardItem = (props) => {
    //TODO ->>> for review
    // const deleteCatHandle = props.deleteCatHandle;
    // const cat = props.cat;
    const { deleteCatHandle, cat } = props;
    


    // const id = cat.id
    // const email = cat.email
    // const name = cat.name
    const { id, email, name } = cat;

    return (
        <li className="item" onClick={() => deleteCatHandle(id)}>
            <img src={`https://robohash.org/${id}?set=set4`} alt="cat" className="item__image" />
            <div className="item__header">{name}</div>
            <div className="item__header">{email}</div>
        </li>
    );
};

export default CardItem;