import React from 'react';

const AddLoc: React.FC = () => {
    return (
        <>
            <form>
                <label>Enter a Location:</label>
                <input type="text" id="inputName" name="inputLoc"/>
            </form>
            <button onClick={() => {

                const input = (document.getElementById("inputName") as HTMLInputElement).value;


            }}>Add</button>
        </>
    );
}

export default AddLoc;