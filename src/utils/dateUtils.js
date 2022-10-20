import moment from 'moment';
import 'moment/dist/locale/vi';

export const getTimeAgo = (date) => {
	return moment(date).locale('vi').fromNow();
};
