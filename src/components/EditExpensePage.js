import React from 'react';

    const EditExpensePage=(props)=>
    
    {
        console.log(props.match.params.id);
        return (
            <div>
       This is test from EditExpensePage {props.match.params.id}page
       </div>
        )
    }
    


    export default EditExpensePage;