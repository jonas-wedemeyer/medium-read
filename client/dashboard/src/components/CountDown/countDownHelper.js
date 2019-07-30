import moment from 'moment';

const refreshTimer = (date, stateSetter, deletingFunction, articleId) => {
  // Get neccessary moments in time
  const now = moment();
  const end = moment(date);

  // Calculate remaining time
  const remainingTime = moment(end - now);

  // Calculate time units to be displayed
  const days = remainingTime.format('D') > 1 ? remainingTime.subtract(1, 'days').format('D') : '0';
  const hours = remainingTime.format('HH') > 1 ? remainingTime.subtract(1, 'hours').format('HH') : '0';
  const minutes = remainingTime.format('mm') > 1 ? remainingTime.subtract(1, 'minutes').format('mm') : '0';
  const seconds = remainingTime.format('ss');

  // Add another put method to increase the object counter time once it hits zero
  // TODO: Refactor to ternary
  if (now.isAfter(end)) {
    deletingFunction(articleId);
  } else  {
    stateSetter({
      days,
      hours,
      minutes,
      seconds,
    });
  }
};

export default refreshTimer;