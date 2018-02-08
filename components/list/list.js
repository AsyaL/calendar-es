import data from '../../data/data.json';

class List {
        constructor(options) {
        this.el = options.el;
        this.startYear = options.startYear;
        this.startMonth = options.startMonth;
        this.startDay = options.startDay;
        this.render();
        }
    isLeapYear() {
        let y = this.startYear;
        return y % 4 == 0 && y % 100 != 0 || y % 400 == 0;
    }
    getFirstLastDay(date,daysMonth) { 
        let getYear = date.getFullYear();
        let getMonth = date.getMonth();
        let toFirstDay = new Date( getYear, getMonth );
        let toLostDay = new Date( getYear, getMonth, daysMonth );
        let firstDay = toFirstDay.getDay();
        if  ( firstDay == 0 ) firstDay = 7;
        
        let endDay = toLostDay.getDay();
        if  ( endDay == 0 ) endDay = 7;
        return {firstDay: firstDay - 1 ,
                        endDay: endDay - 1}
    }


    getTable(weekday, daysMonth, arrDay, weekdayEnd) {
        for ( let i = 0; i < weekday; i++ ) { arrDay.push(`<td class="style_td"></td>`) };
        for ( let i = 1; i <= daysMonth; i++ ) { 
            let nom = i;
            if (nom == this.startDay) {
                arrDay.push(`<td class="today">${nom}</td>`)
            } else { 
                arrDay.push(`<td class="style_td">${nom}</td>`)
            }
        };
        for ( let i = weekdayEnd; i < 6 ; i++ ) { arrDay.push(`<td class="style_td"></td>`) };
        for (let i = 1; i <= arrDay.length; i++) {
            if (i % 7 == 6) { arrDay[i]+='</tr><tr>' }
        };
    }

    getrender(date) {
        if (this.isLeapYear()) {
            data[1].amountDays = 29;       
        }
        let arrDay = [];
        let daysMonth = data[this.startMonth].amountDays;
        let getFirstLastDay = this.getFirstLastDay(date, daysMonth);
        let weekday = getFirstLastDay.firstDay;
        let weekdayEnd = getFirstLastDay.endDay;
 
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
        <div class="year"><span class="minus">-</span>${this.startYear}<span class="plus">+</span></div></div>
        <table><tbody><tr><td class="style_week_td">Mon</td><td class="style_week_td">Tue</td><td class="style_week_td">Wed</td><td class="style_week_td">Thu</td><td class="style_week_td">Fri</td><td class="style_week_td">Sat</td><td class="style_week_td">Sun</td</tr>
        ${renderCalendar}  
        </tbody>
        </table>`; 
        data[1].amountDays = 28; 
    }

    render() {
    let date = new Date( this.startYear, this.startMonth);
    this.getrender( date ); 

    
    }
}

export default List;