import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../../index";
import ListGroup from "react-bootstrap/ListGroup";

const TypeBar = observer(() => {
  const { test } = useContext(Context);
  return (
    <ListGroup style={{marginTop: 15}}>
      {test.types.map((type) => (
        <ListGroup.Item
            style = {{cursor: 'pointer'}}
            active={type.id === test.selectedType.id} 
            onClick = {() => test.setSelectedType(type)}
            key={type.id}
        >
            {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
