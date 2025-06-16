import React from 'react';

interface NavProps {
    setIsOpen: (stat: boolean) => void;
}


const AddLoc: React.FC<NavProps> = (Props) => {

    const {setIsOpen} = Props;

    return (
        <>
            <div id="navBar">
                <div id="innerNav">
                    <img src="/logo.png" alt="Logo" id="logo"/>
                    <h2 id="nameNav">Weather APP</h2>
                </div>
                <button onClick={() => setIsOpen(true)} id="addButton">Find Location</button>
            </div>

            <br/>
            <br/>
        </>
    );
}

export default AddLoc;