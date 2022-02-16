import { Notify } from 'quasar';

const success = message => {
  Notify.create({
    type: 'positive',
    message: message,
    position: 'top'
  });
};

const error = message => {
  Notify.create({
    type: 'negative',
    message: message,
    position: 'top'
  });
};

export default { success, error };
