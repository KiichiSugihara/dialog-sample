import createDialogHandler from './dialog.js';

const sampleDialogElement = document.getElementById('sample-dialog-element');

const initSampleDialog = () => {
  //
  // DOM取得
  //

  // dialogのelement取得
  const sampleDialogContainer = document.getElementById(
    'sample-dialog-container'
  );
  const sampleDialogTopBar = document.getElementById('sample-dialog-top-bar');
  const sampleDialogBottomBar = document.getElementById(
    'sample-dialog-bottom-bar'
  );
  const sampleDialogOpenButton = document.getElementById(
    'sample-dialog-open-button'
  );
  const sampleDialogResetButton = document.getElementById(
    'sample-dialog-reset-button'
  );
  const sampleDialogSubmitButton = document.getElementById(
    'sample-dialog-submit-button'
  );

  // Create Dialog
  const { openDialog, closeDialog } = createDialogHandler({
    element: sampleDialogElement,
    container: sampleDialogContainer,
    topBar: sampleDialogTopBar,
    bottomBar: sampleDialogBottomBar,
  });

  const openSampleDialog = () => {
    // 開く前に処理したいことあれば記述

    openDialog();
  };

  const resetSampleDialog = () => {
    // 閉じる前に処理したいことあれば記述

    closeDialog();
  };

  const submitSampleDialog = () => {
    // 閉じる前に処理したいことあれば記述

    closeDialog();
  };

  // Dialogのclickイベント登録
  sampleDialogOpenButton.addEventListener('click', openSampleDialog);
  sampleDialogResetButton.addEventListener('click', resetSampleDialog);
  sampleDialogSubmitButton.addEventListener('click', submitSampleDialog);
};

if (sampleDialogElement) {
  initSampleDialog();
}
