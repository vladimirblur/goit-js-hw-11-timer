// ----------------------------------------------------------------------------
// --------------------------------- ФУНКЦИИ ----------------------------------
// ----------------------------------------------------------------------------

const refs = {
      clockDays: document.querySelector('[data-value="days"]'),
      clockHours: document.querySelector('[data-value="hours"]'),
      clockMins: document.querySelector('[data-value="mins"]'),
      clockSecs: document.querySelector('[data-value="secs"]'),
      title: document.querySelector('.title'),
      dateRef: document.querySelector('[data-value="date"]'),
    }

const bodyRef = document.querySelector('body');

class CountdownTimer {

  constructor({ selector, targetDate, }) {

    this.refs = {
      clockDays: document.querySelector(`${selector} [data-value="days"]`),
      clockHours: document.querySelector(`${selector} [data-value="hours"]`),
      clockMins: document.querySelector(`${selector} [data-value="mins"]`),
      clockSecs: document.querySelector(`${selector} [data-value="secs"]`),
      title: document.querySelector(`${selector} .title`),
      dateRef: document.querySelector(`${selector} [data-value="date"]`),
    }


    this.selector = selector;
    this.targetDate = targetDate;
    this.currentTime = 0;
    this.timerID = null;
    this.finishTitle = `Black Friday is start!`;
      this.refs.dateRef.textContent = this.targetDate.toDateString();
    
    this.startTimer();
  }

  
  pad(value) {
    return String(value).padStart(2, '0');
  }

   getTimeComponents(currentTime, targetDate) {
    const days = this.pad(Math.floor((targetDate - currentTime) / (1000 * 60 * 60 * 24)))
    const hours =  this.pad(Math.floor(((targetDate - currentTime) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),)
    const mins = this.pad(Math.floor(((targetDate - currentTime) % (1000 * 60 * 60)) / (1000 * 60)))
    const secs = this.pad(Math.floor(((targetDate - currentTime) % (1000 * 60)) / 1000))

    return { days, hours, mins, secs }
  }

 
  
  startTimer() {
        if (this.targetDate < Date.now()) {
      this.refs.clockDays.textContent = `⁂`
      this.refs.clockHours.textContent = `⁂`
      this.refs.clockMins.textContent = `⁂`
      this.refs.clockSecs.textContent = `⁂`
      this.refs.title.textContent = `${this.finishTitle}`

      return
    }
    
   this.timerID =  setInterval(() => {
        this.currentTime = Date.now();
      this.updateTimerInterface(this.getTimeComponents(this.currentTime, this.targetDate));
    }, 1000);
  }

      finishTimer() {
        const { days, hours, mins, secs } = this.getTimeComponents(
            this.currentTime,
            this.targetDate,
        );

        if (Number(days) <= 0 && Number(hours) <= 0 && Number(mins) <= 0 && Number(secs) <= 0) {
            clearInterval(this.timerId);
        }
    }
    

 

  updateTimerInterface({ days, hours, mins, secs }) {
      
    refs.clockDays.textContent = `${days}`
    refs.clockHours.textContent = `${hours}`
    refs.clockMins.textContent = `${mins}`
    refs.clockSecs.textContent = `${secs}`
  
  }

}

const timer = new CountdownTimer({ selector: '#timer-1', targetDate: new Date('Nov 17, 2021') })
