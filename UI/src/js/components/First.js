var React = require('react');
var Router = require('react-router');
var Navbar = require('./Navbar');
//var PreviousSearch=require('./Previoussearch')

//var movieData=[];
var city=["Hyderabad","Chennai","Bangalore","Mumbai","Kolkata","Delhi","Goa"];
var Weather=React.createClass({
getInitialState: function() {
  var i=[];
  var others=city;
  $.ajax({
        url: '/api/all',
        dataType: 'json',
        async:false,
        success: function(data) {
          i=data;
          data.map(function(d){
            if(others.indexOf(d.name)!=-1){
              others.splice(others.indexOf(d.name),1);
            }
          });
        }.bind(this)
      });
      return ({data:i,rem:others});
},

render:function(){
  var a=this;
  return (
<div className="row">
     {this.state.data.map(function(d){
       return (

         <div className="col-lg-12 well">
            <button className="btn btn-link" type="submit"  data-toggle="modal" data-target="#myModal" value={d.name} onClick={a.viewmore}>{d.name},{d.sys.country}</button>
        {d.weather[0].description}
        <p>
{d.main.temp} temperature from {d.main.temp_min} to {d.main.temp_max},wind {d.wind.speed}m/s,clouds {d.clouds.all}%,{d.main.pressure} hpa
        </p>
        <p>
Geo Cords:[{d.coord.lon},{d.coord.lat}]
        </p>

          <div className='col-lg-6'>
            <button className="btn btn-info" type="submit" value={d} onClick={a.newone}>Refresh</button>
            </div>
            </div>
       );
     })}

{this.state.rem.map(function(d){
  return(
    <div className='col-lg-12'>
    <div className='col-lg-6'>
    {d}
    </div>
      <div className='col-lg-6'>
        <button className="btn btn-warning" type="submit" value={d} onClick={a.newone}>Refresh</button>
        </div>
        </div>
  );
})}
</div>
)
},

newone:function(q){
  var name=q.target.value;
  $.ajax({
  url:"http://api.openweathermap.org/data/2.5/weather?q="+name+"&appid=7bda14797d8e8d1b1f34772f29226d61",
dataType:'json',
success:function(data){
  var rem=this.state.rem;
  if(rem.indexOf(name)!=-1){
  $.ajax({
      url: "/api/weather",
      dataType: 'json',
      data:JSON.stringify(data),
      type:"POST",
      contentType:'application/json',
      success: function(data){
alert(d.name+'data added Successfully');
      }.bind(this)
    });
    rem.splice(rem.indexOf(name),1);
    var o=this.state.data;
    o.push(data);
    this.setState({data:o,rem:rem});
  }
  else{
$.ajax({
    url: "/api/update/"+name,
    data:data,
    type:"PUT",
    success: function(d){
alert('data updated Successfully');
    }.bind(this)
  });
  }
}.bind(this)
});
}
});
module.exports=Weather;
