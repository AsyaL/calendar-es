import data from '../../data/data.json';

class List {
		constructor(options) {
        this.el = options.el;
        this.startYear = options.startYear;
        this.startMonth = options.startMonth;
        this.render();
        }

	getFirstDay(date) { 
        let getYear = date.getFullYear();
        let getMonth = date.getMonth();
        let foFirstDay = new Date( getYear, getMonth );
        let firstDay = foFirstDay.getDay();
        if  ( firstDay == 0 ) firstDay = 7;
        return firstDay - 1;
    }
    getEndDay(date,daysMonth) { 
        let getYear = date.getFullYear();
        let getMonth = date.getMonth();
        let foFirstDay = new Date( getYear, getMonth, daysMonth );
        let endDay = foFirstDay.getDay();
        if  ( endDay == 0 ) endDay = 7;
        return endDay - 1;
    }

    getTable(weekday, daysMonth, arrDay, weekdayEnd) {
        for ( let i = 0; i < weekday; i++ ) { arrDay.push(`<td></td>`) };
        for ( let i = 1; i <= daysMonth; i++ ) { 
            let nom = i;
            arrDay.push(`<td>${nom}</td>`) 
        };
        for ( let i = weekdayEnd; i < 6 ; i++ ) { arrDay.push(`<td></td>`) };
        for (let i = 1; i <= arrDay.length; i++) {
            if (i % 7 == 6) { arrDay[i]+='</tr><tr>' }
        };
    }

    getrender(date) {
        let arrDay = [];
        let daysMonth = data[this.startMonth].amountDays;
        let weekday = this.getFirstDay(date);
        let weekdayEnd = this.getEndDay(date, daysMonth);

        let nameMonth = data.map(( data, id ) => {
            let nameM = data.month;
            let dataId = id;
            let item =`<option class="style_option"  value="${dataId}"> ${nameM} </option>`;
            if ( id == this.startMonth ) {
                item =`<option class="style_option" value="${dataId}" selected="selected" > ${nameM} </option>`; 
            }
            return item;
 
        });

        this.getTable( weekday, daysMonth, arrDay, weekdayEnd );
        let str = arrDay.join('');
        let renderCalendar = `<tr>`;
        renderCalendar += str;
        this.el.innerHTML = `
       
        <div><select id="selectBox" >${nameMonth}</select>
        <div class="year">${this.startYear}</div></div>
        <table><tbody><tr><td>Mon</td><td>Fr</td><td>F</td><td>V</td><td>Fr</td><td>S</td><td>S</td</tr>
        ${renderCalendar}  
        </tbody>
        </table>`; 
    }

    render() {
    let date = new Date( this.startYear, this.startMonth );
    this.getrender( date );  
    
    }
}

export default List;