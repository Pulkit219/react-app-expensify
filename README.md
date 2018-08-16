# react-App-Expense Calc

<li>
 Need to install presets first REACT and env
    Compiling REACT code with babel 
    babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
    
    JSX uses className instead of class=""
    
    To render array JSX inside JSX an example
    KEY MUST be there as a reference

```{app.options.map((option,ind)=>{
                    return < li key={ind}>{option}</ li >;
                })}
```
</li>
   


    

<li>

```Generate random numbers const randomNumber =((Math.floor(Math.random()* app.options.length))+1)

    Enable/disble button with iternary operator < button onClick={onMakeDecision} disabled={app.options.length>0?false:true}>WHat should I do</ button > 
```
</li>





<li>
HOW TO TOGGLE

    
```< button onClick={showSomething}>{visibility?"hide details":"Show details"}< /button>
            {visibility && < p>you got it</ p>}

    const showSomething=()=>{
        visibility=!visibility;

    }
```
</li>



<li>
COMPONENT PROPS is just similar to  class="" id=""


```const options=['one','two', 'three'];

 return (
                
                <Options options={options}/>
                <AddOption />
            
        )

        and now options comp will have access by using this.props.options

-----------------------------------------------------
        class Options extends React.Component{
    render(){
     return (
            <div>
                {this.props.options.map((option)=>{
                    return <Option key={option} optionText={option}/> ;
                })}
                
                
            </div>
        );
    }
}
```
</li>





<li>
HOW TO bind THIS to correct context using contructor

``` constructor(props){
        super(props);
        this.removeAll=this.removeAll.bind(this);
    }
```
</li>





<li>
        HOW to change state and re-render component

```firstly a state is defined in conctructor in the app component
        constructor(props){
                super(props);
                this.state={
                    options:[]
                }
                this.handleDeleteOptions=this.handleDeleteOptions.bind(this);
            }
        
 Then create a function under the constructor with *****setState
    handleDeleteOptions(){
        this.setState(()=>{
         return{
            options:[]
         };
        });
    }
        

then pass this fuction as a prop if used in other component
< Options options={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions}
                />


class Options extends React.Component{

    render(){
     return (
            <div>
            
                {this.props.options.map((option)=>{
                    return <Option key={option} optionText={option}/> ;
                })}
                
                <button onClick={this.props.handleDeleteOptions}>remove all</button>
            </div>
        );
    }
}
```
</li>





<li>
Use of stateless Functional Component, NO STATE HANDLING, JUST SIMPLE PRESENTATION
```const User=(props)=>{
    return(
        <div>
          <p>Name:{props.name}</p>
          <p>age:{props.age}</p>
        </div>
    )
}
```
</li>





<li>
 HOW TO PASS DEFAULT PROPS ? if no props passed it will use default one
```
Header.defaultProps={
    title:'Decision'
    };
```
</li>




<li>
How to implicilty return in One Line, We use ({})

 
``` handleDeleteOptions(){
        this.setState(()=>
        ({}));
    }
```
</li>




<li>
LIFECYCLE METHODS

```componentDidMount(){
        console.log("fetching data");

        try{
            const options = JSON.parse(localStorage.getItem('options'));
            if(options){
                this.setState(()=>({options}));
            }
            
        } catch(e){

        }

        
        
    }
    componentDidUpdate(prevProps,prevState){
        if(prevState.options.length!==this.state.options.length)
        {   
            console.log("updated");
            const json =JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
           
        } 
        
    }

    componentWillUnmount()
    {
     fired when re-directed to other component
    }
```
</li>





<li>
CONFIGURE WEBPACK

```A FILE webpack.config.js must be created in root folder
inside webpack.config.js
const path = require('path');


module.exports={
    entry:'./src/app.js',
    output:{
        path:path.join('__dirname','public'),
        filename:'bundle.js'
    }
}

```
</li>




<li>
REDUX SET UP
```npm install redux react-redux
        create a store so that it can be accesible by any component, that's the sole purpose
        cons store =createStore((state={initState},action)=>{
            switch(action.type){
                case INCREMENT_EXAMPLE1:
                return{
                   count:count+1
                };
                case DECREMENT_EXAMPLE2:
                return{
                   count:count-1
                };
                }
        }); or || export default ()=>{
    const store = createStore(
        combineReducers({
          expenses: expensesReducer,
          filters:filtersReducer
    
        })
    );
    return store;
}```
</li>





<li>
ACTIONS PASSED TO REDUCERS AND THEN STATE IS SAVED TO STORE ABOVE
```const expensesReducerDefaultState =[];

export default (state =expensesReducerDefaultState ,action)=>{
  switch (action.type){
      case 'ADD_EXPENSE':
      return[
          ...state,action.expense
      ];
      case 'REMOVE_EXPENSE':
      return state.filter(({id})=> id!== action.id);

      case 'EDIT_EXPENSE':
      return state.map((expense)=>{
          if(expense.id === action.id)
          {
              return {
                  ...expense,
                  ...action.updates
              };
          }
          else
          {
              return expense;
          }
      })
      default:
      return state;
  }
};```
</li>



<li>
DISPATCH ACTIONS TO REDUCERS/STORE IN ORDER TO MAKE CHANGES TO STORE
```//ADD EXPENSE
export const addExpense=({
    description='',
    note='',
    amount=0,
    createdAt=0
}={})=>({
    type:'ADD_EXPENSE',
    expense:{
      id:uuid(),
      description,
      note,
      amount,
      createdAt
    }
})```
</li>




<li>
HOW TO DISPATCH AN ACTION
```store.dispatch(addExpense({description:'water bill'}));```

</li>



<li>
HOW TO PROVIDE STORE TO ALL REACT COMPONENTS || SHOULD BE DONE IN MAIN APP.JS
```<Provider store={store}> 
      rest of components
   </Provider>```
</li>



<li>
HOW TO GET STATE IN A REACT COMPONENT
```import { connect } from 'react-redux';


const ExpenseList = (props) => (
  <div>
    <h1>{props.expenses.length}</h1>
    
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses
  };
};

export default connect(mapStateToProps)(ExpenseList);```
</li>