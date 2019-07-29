import moment from 'moment';

const refreshTimer = (date, stateSetter) => {
  // Get neccessary moments in time
  const now = moment();
  const end = moment(date).add(3, 'days');

  // Calculate remaining time
  const remainingTime = moment(end - now);

  // Calculate time units to be displayed
  const days = remainingTime.add(-1, 'days').format('D');
  const hours = remainingTime.format('HH');
  const minutes = remainingTime.format('mm');
  const seconds = remainingTime.format('ss');

  // TODO:
  // Add another put method to increase the object counter time once it hits zero
  // If it hits 0  and three hearts are out, invoke delete method

  // Update the state
  stateSetter({
    days,
    hours,
    minutes,
    seconds,
  });
};

export default refreshTimer;
