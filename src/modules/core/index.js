import * as LoadingIndicatorRedux from './redux/loading-indicator';
import * as ModalRedux from './redux/modal';
import * as ErrorHandlerRedux from './redux/error-handler';
import * as AlertRedux from './redux/alert';
import * as LanguageRedux from './redux/language';

const CoreModule = {
  redux: {
    language: LanguageRedux,
    loading: LoadingIndicatorRedux,
    modal: ModalRedux,
    errorHandler: ErrorHandlerRedux,
    alert: AlertRedux
  }
};

export default CoreModule;
