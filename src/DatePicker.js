import React, { Component } from 'react'

export default class DatePicker extends Component{
    constructor(props){
        super(props)
        this.state={
            dateNow: new Date()
        }
        
    }
    pre(){
        let newDate = new Date(this.state.dateNow.getTime() - this.state.dateNow.getDate() * 24 * 60 * 60 * 1000)
        this.setState(Object.assign({}, this.state, {dateNow: newDate}))
    }
    next(){
        let newDate = new Date(this.state.dateNow.getFullYear(), this.state.dateNow.getMonth()+1, 1)
        this.setState(Object.assign({}, this.state, {dateNow: newDate}))
    }
    render(){
        let arrRows = getRows(this.state.dateNow)
        return(
            <div>
                <input type="date"/>
                <div>
                    <span onClick={this.pre.bind(this)}>{'<'}</span>
                    <span onClick={this.next.bind(this)}>{'>'}</span>
                    <p>{`${yearNow}年${MonthNow}月${this.state.dateNow.getDay()}日`}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>周日</th>
                                <th>周一</th>
                                <th>周二</th>
                                <th>周三</th>
                                <th>周四</th>
                                <th>周五</th>
                                <th>周六</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrRows}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


function getDateArr(date){
    let MonthNow = date.getMonth() + 1
    let yearNow = date.getFullYear()
    let firstDay = new Date(yearNow, MonthNow-1,1)
    let lastDay = new Date(yearNow, MonthNow, 0)
    let arrDate = []
    for(let i = firstDay.getDay(); i > 0 ; i--){
        let newDate = new Date(firstDay.getTime() - i * 24 * 60 * 60 * 1000)  
        arrDate.push(<td className="prev" key={String(newDate.getDate())}>{newDate.getDate()}</td>)
    }
    for(let i = 0; i < lastDay.getDate(); i++){

        let newDate = new Date(firstDay.getTime() + i * 24 * 60 * 60 * 1000)
        arrDate.push(<td className="cur" key={String(newDate.getDate())}>{newDate.getDate()}</td>)
    }
    for(let i = 1; i <= (6 - lastDay.getDay()); i++){
        let newDate = new Date(lastDay.getTime() + i * 24 * 60 * 60 * 1000)
        arrDate.push(<td className="next" key={String(newDate.getDate())}>{newDate.getDate()}</td>)
    }
    return arrDate
}


function getRows(date){
    let arrDate = getDateArr(date)
    let numberOfRows = arrDate.length / 7
    let arrRows =  []
    for(let i = 0; i < numberOfRows; i++){
        arrRows.push(<tr key={'row' + i}>{arrDate.splice(0,7)}</tr>)
    }
    return arrRows
}

