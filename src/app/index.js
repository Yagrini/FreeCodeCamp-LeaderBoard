import React from 'react';
import  ReactDOM from 'react-dom';

let i=1;
const LeaderList = (props) => {
    const LeaderItems = props.data.map((item) => {
        return (
            <LeadertItem  item={item} key={item.username} />
        );
    });
    return(
        <tbody>
            {LeaderItems}
        </tbody>
    );
}
const LeadertItem = ({item}) => {
    const id = item.username;
    const url = 'https://www.freecodecamp.org/'+id;
    const number = i++;
    return (
        <tr>
            <th scope="row">{number}</th>
            <td><img src={item.img} id="image"/>&nbsp;&nbsp;<a href={url} >{item.username}</a></td>
            <td>{item.recent}</td>
            <td>{item.alltime}</td>
        </tr>
    );

};

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {data : [] };
        this.onboardSelect('https://fcctop100.herokuapp.com/api/fccusers/top/alltime','alltime','recent');
    }
    onboardSelect(arg,arg2,arg3){
        $.getJSON(arg,(mydata) =>  {
            this.setState({data : mydata});
        });

        $('#'+arg2).css('background-color','#aaa'); $('#'+arg3).css('background-color','#fff');
        if(arg2=='alltime')
        {
            $('#'+arg2).html('All time points ⇣');
            $('#'+arg3).html('Points in past 30 days');
        }else{
            $('#'+arg2).html('Points in past 30 days ⇣');
            $('#'+arg3).html('All time points');
        }
        i=1;
    }
    render(){

        return(
            <div className="container ">
                <div id="title" className="text-center">FreeCodeCamp : LeaderBoard</div>
                <table className="table table-bordered table-striped all">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Camper Name</th>
                        <th id="recent" onClick={()=>{this.onboardSelect('https://fcctop100.herokuapp.com/api/fccusers/top/recent','recent','alltime');}}>Points in past 30 days</th>
                        <th id="alltime" onClick={() => {this.onboardSelect('http://fcctop100.herokuapp.com/api/fccusers/top/alltime','alltime','recent');}}>All time points ⇣</th>
                    </tr>
                    </thead>
                    <LeaderList data = {this.state.data}/>
                </table>
             </div>
        );
    }
}
ReactDOM.render(<App/>,document.getElementById('app'));