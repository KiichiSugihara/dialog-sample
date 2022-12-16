import dialogPolyfill from 'dialog-polyfill';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export default function createDialogHandler({
  element,
  container,
  topBar,
  bottomBar,
}) {
  dialogPolyfill.registerDialog(element);

  const windowScrollPosition = { top: 0, left: 0 };
  let ticking = false;

  const handleScrollOnDialog = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        ticking = false;

        topBar.classList[element.scrollTop > 0 ? 'add' : 'remove']('is-sticky');

        // iOSにて、最初からstickyにしておくと、DialogのbottomBarの表示が遅れるので、ファーストビューからスクロールされた時だけstickyで表示する
        bottomBar.classList.add('is-sticky');
      });

      ticking = true;
    }
  };

  const openDialog = () => {
    windowScrollPosition.top = window.scrollY;
    windowScrollPosition.left = window.scrollX;

    // Dialogを開く
    element.showModal();

    // Dialogを開いたら、スクロールロック
    disableBodyScroll(container, {
      // iOSにて、Dialogもscroll lockされるので対処
      // 参考: https://github.com/willmcpo/body-scroll-lock#allowtouchmove
      allowTouchMove: () => true,
    });
  };

  const closeDialog = () => {
    // Dialogのスクロールを上に戻して、Dialogが開いた際の位置を初期化する
    element.scrollTo(0, 0);

    // Dialog外のスクロールロック解除
    enableBodyScroll(container);

    element.close();

    // iOSにて、最初からstickyにしておくと、DialogのbottomBarの表示が遅れるので、表示している時だけstickyで表示する
    bottomBar.classList.remove('is-sticky');

    // MEMO: iOS(WebKit)にて、画面全体のscrollが一緒に初期化されるバグがあるので、保存しておいた値を代入
    window.scrollTo(windowScrollPosition);
  };

  const handleKeydownESC = (e) => {
    if (!e.repeat && e.keyCode === 27 && element.open) {
      closeDialog();
    }
  };

  // 背景クリックの監視
  element.addEventListener('click', (e) => {
    // はみ出たdialog背景をクリックした際に、Dialogを閉じる
    if (e.target === element) {
      closeDialog();
    }
  });

  element.addEventListener('scroll', handleScrollOnDialog);
  document.addEventListener('keydown', handleKeydownESC);

  return {
    openDialog,
    closeDialog,
  };
}
