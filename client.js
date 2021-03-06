// *** SETUP ***

var dale = window.dale, teishi = window.teishi, lith = window.lith, c = window.c, B = window.B;
var type = teishi.t, clog = teishi.l, media = lith.css.media;

// TODOv2 remove
var T = teishi.time ();

// *** CSS ***

var CSS = {
   toRGBA: function (hex) {
      hex = hex.slice (1);
      return parseInt (hex.slice (0, 2), 16) + ', ' + parseInt (hex.slice (2, 4), 16) + ', ' + parseInt (hex.slice (4, 6), 16);
   },
   // *** variables.scss ***
   vars: {
      // Layout sizes
      'sidebar-width': 300,
      // Colors
      'color--one': '#5b6eff',
      'color--attach': '#87D7AB',
      'color--remove': '#FC201F',
      'highlight--neutral': '#d8eeff',
      'highlight--selection': '#ffeccc',
      'highlight--positive': '#cfefdd',
      'highlight--negative': '#ffd3d3',
      // Greys
      'grey--darkest': '#3a3a3a',
      'grey--darker': '#484848',
      'grey': '#8b8b8b',
      'grey--light': '#dedede',
      'grey--lighter': '#f2f2f2',
      'grey--lightest': '#fbfbfb',
      // typefaces
      fontPrimarySemiBold: {
         'font-family': '\'Montserrat\'',
         'font-weight': '600',
         'font-style': 'normal',
      },
      fontPrimarySemiBoldItalic: {
         'font-family': '\'Montserrat\'',
         'font-weight': '600',
         'font-style': 'italic',
      },
      fontPrimaryMedium: {
         'font-family': '\'Montserrat\'',
         'font-weight': '500',
         'font-style': 'normal',
      },
      fontPrimaryMediumItalic: {
         'font-family': '\'Montserrat\'',
         'font-weight': '500',
         'font-style': 'italic',
      },
      fontPrimaryRegular: {
         'font-family': '\'Montserrat\'',
         'font-weight': '400',
         'font-style': 'normal',
      },
      fontPrimaryItalic: {
         'font-family': '\'Montserrat\'',
         'font-weight': '400',
         'font-style': 'italic',
      },
      // border radius
      'border-radius--s': 3,
      'border-radius--m': 6,
      'border-radius--l': 12,
      // padding
      'padding--xs': 6,
      'padding--s': 10,
      'padding--m': 22,
      'padding--l': 34,
      'padding--xl': 50,
      'padding--xxl': 74,
      // transition easings
      easeOutQuad:  'all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      easeInQuad:   'all 400ms cubic-bezier(0.55, 0.085, 0.68, 0.53)',
      easeOutQuart: 'all 400ms cubic-bezier(0.165, 0.84, 0.44, 1)',
      easeInQuart:  'all 400ms cubic-bezier(0.895, 0.03, 0.685, 0.22)',
   },
   // *** typography_setup.scss ***
   typography: {
      typeBase: 13,
      typeRatio: 1.125,
      typeLineHeight: 1.5,
      fontSize: function (number, ratio) {
         return (Math.round (Math.pow (ratio || CSS.typography.typeRatio, number) * 100000) / 100000) + 'rem';
      },
      spaceVer: function (number, lineHeight) {
         return (Math.round (number * (lineHeight || CSS.typography.typeLineHeight) * 100000) / 100000) + 'rem';
      },
   },
};

// *** variables.scss (they go here because they reference other variables) ***

// grey interactive
CSS.vars ['grey--link'] = 'rgba(' + CSS.toRGBA (CSS.vars ['grey--darker']) + ', 0.8)';
// border colors
CSS.vars ['border-color']       = CSS.vars ['grey--lighter'];
CSS.vars ['border-color--dark'] = CSS.vars ['grey--light'];

// *** mixins.scss (they go here because they reference other variables and hence we can't add them to the object itself without having a reference error) ***

CSS.vars.cross = function (selector, size, color) {
   return [selector, {
      display: 'inline-block',
      position: 'relative',
      'width, height': size || 32,
   }, [
      ['&::after, &::before', {
         content: "''",
         position: 'absolute',
         'top, left': 0.5,
         'margin-left': -0.5,
         display: 'inline-block',
         width: 1,
         height: '1px',
         'background-color': color || CSS.vars ['grey--lighter'],
         transform: 'rotate(-45deg)',
         transition: CSS.vars.easeOutQuart,
      }],
      ['&::after', {transform: 'rotate(45deg)'}]
   ]];
}

CSS.vars.crossHover = function (color) {
   return ['&::after, &::before', {'background-color': color || CSS.vars ['grey--darker']}];
}

CSS.litc = [
   // *** reset.scss ***
   ['html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video', {
      'margin, padding, border': 0,
      'font-size': 1,
      font: 'inherit',
      'vertical-align': 'baseline',
   }],
   ['article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section', {display: 'block'}],
   ['body', {'line-height': '1'}],
   ['ol, ul', {'list-style': 'none'}],
   ['blockquote, q', {quotes: 'none'}],
   ['LITERAL', 'blockquote:before, blockquote:after, q:before, q:after {content: \'\'; content: none}'],
   ['table', {'border-collapse': 'collapse', 'border-spacing': 0}],
   // *** typography.scss ***
   ['*', {'-webkit-font-smoothing': 'antialiased', '-moz-osx-font-smoothing': 'grayscale'}],
   ['html', {'font-size': CSS.typography.typeBase}],
   ['html, body', {'line-height': CSS.typography.spaceVer (1), mixin1: CSS.vars.fontPrimaryRegular}],
   ['p, a, li',   {'line-height': CSS.typography.spaceVer (1), mixin1: CSS.vars.fontPrimaryRegular}],
   // Global typographic styles
   ['.page-title', {
      'font-size':   CSS.typography.fontSize (7),
      'line-height': CSS.typography.spaceVer (1.75),
      'margin-bottom': CSS.typography.spaceVer (0.25),
      mixin1: CSS.vars.fontPrimaryRegular,
   }],
   ['.page-subtitle', {
      'font-size':   CSS.typography.fontSize (1),
      mixin1: CSS.vars.fontPrimaryItalic,
      color: CSS.vars.grey,
   }],
   // *** main-styles.scss ***
   ['a, .pointer', {cursor: 'pointer'}],
   ['a', {'text-decoration': 'none'}],
   ['*', {'box-sizing': 'border-box'}], // Makes padding included in width
   ['input:focus, textarea:focus', {outline: 'none'}],
   ['body', {'width, height': 1}],
   media ('screen and (max-width: 767px)', [
      ['.hide-on-mobile', {display: 'none'}],
   ]),
   // *** colors.scss ***
   ['body', {'background-color': '#fff', color: CSS.vars ['grey--darker']}],
   ['p > a', {color: CSS.vars ['color--one']}],
   // *** buttons.scss ***
   ['.button', {
      outline: 0,
      'border-radius': 100,
      mixin1: CSS.vars.fontPrimaryMedium,
      'line-height': 40,
      height: 42,
      display: 'inline-flex',
      'align-items': 'center',
      'padding-left, padding-right': CSS.vars ['padding--m'],
      'text-align': 'center',
      transition: CSS.vars.easeOutQuart,
   }],
   ['.button--one', {
      border: '1px solid ' + CSS.vars ['color--one'],
      'background-color': CSS.vars ['color--one'],
      color: '#fff',
   }],
   media ('screen and (min-width: 1025px)', ['.button--one:hover', {
      'background-color': '#fff',
      color: CSS.vars ['color--one'],
   }]),
   ['.button--two', {
      border: '1px solid ' + CSS.vars.grey,
      'background-color': '#fff',
      color: CSS.vars.grey,
   }],
   media ('screen and (min-width: 1025px)', ['.button--two:hover', {
      background: CSS.vars.grey,
      color: '#fff',
   }]),
   // Buttons icon
   ['.button__icon', {
      display: 'inline-block',
      'width, height': 24,
      'margin-left': -4,
   }],
   ['.button--one .button__icon', ['path', {fill: '#fff'}]],
   media ('screen and (min-width: 1025px)', ['.button--one:hover .button__icon', ['path', {fill: CSS.vars ['color--one']}]]),
   ['.button--two .button__icon', ['path', {fill: CSS.vars.grey}]],
   media ('screen and (min-width: 1025px)', ['.button--two:hover .button__icon', ['path', {fill: '#fff'}]]),
   // *** structure.scss ***
   ['.max-width--m', {'max-width': 670, width: 1}],
   // *** forms.scss ***
   ['input', {
      border: 0,
      'font-size': CSS.typography.fontSize (1),
      width: 1,
   }],
   ['input.search-input', {'padding-left': CSS.vars ['padding--m'], 'padding-right': CSS.vars ['padding--l']}],
   ['input.search-input::placeholder', {mixin1: CSS.vars.fontPrimaryItalic}],
   ['input.attach-input', {
      'line-height, height': 46,
      border: '1px solid ' + CSS.vars ['border-color--dark'],
      'border-radius': 100,
      'padding-left': 15,
      'padding-right': 10,
   }],
   // *** header.scss ***
   ['.header', {
      background: '#fff',
      position: 'fixed',
      'top, left': 0,
      'z-index': '100',
      display: 'flex',
      'align-items': 'center',
      width: 1,
      'border-bottom': '1px solid ' + CSS.vars ['border-color'],
      height: CSS.typography.spaceVer (3),
   }],
   ['.header__brand', {
      width: CSS.vars ['sidebar-width'],
      display: 'inline-block',
      'padding-left': CSS.vars ['padding--m'],
   }],
   ['.header__menu', {'padding-left': CSS.vars ['padding--l']}],
   ['.header__user', {'margin-left': 'auto'}],
   ['.header__upload-button', {'margin-left, margin-right': CSS.vars ['padding--m']}],
   // *** logo.scss ***
   ['.logo__img', {
      display: 'inline-block',
      width: 54,
      height: 'auto',
   }],
   ['.logo__img path', {fill: CSS.vars ['color--one']}],
   // *** main-menu.scss ***
   ['.main-menu', {display: 'flex'}],
   ['.main-menu__item', {'margin-right': CSS.vars ['padding--m']}],
   ['.main-menu__item-link', {
      color: CSS.vars ['grey--link'],
      'font-size': CSS.typography.fontSize (1),
      transition: CSS.vars.easeOutQuart,
   }],
   media ('screen and (min-width: 1025px)', ['.main-menu__item-link:hover', {color: CSS.vars ['color--one']}]),
   // Active menu item
   ['.app-organise .main-menu__item--organise, .app-pictures .main-menu__item--pictures', ['.main-menu__item-link', {color: CSS.vars ['color--one']}]],
   // *** main-menu-mobile.scss ***
   // *** account-menu.scss ***
   ['.account-menu__item', {
      position: 'relative',
      'padding-left, padding-right': 10,
      display: 'flex',
      'align-items': 'center',
      cursor: 'pointer',
   }, ['&::after', {
      content: "''",
      position: 'absolute',
      top: '33.3334%',
      'right, width, height': 0,
      'border-style': 'solid',
      'border-width': '4px 4px 0 4px',
      'border-color': CSS.vars.grey + ' transparent transparent transparent',
   }]],
   media ('screen and (min-width: 1025px)', ['.account-menu__item:hover::after', {'border-color': CSS.vars ['grey--darker'] + ' transparent transparent transparent'}]),
   ['.account-menu__item-icon', {
      position: 'relative',
      display: 'inline-block',
      'width, height': 24,
   }, ['path', {fill: CSS.vars ['grey--link']}]],
   media ('screen and (min-width: 1025px)', ['.account-menu__item:hover .account-menu__item-icon path', {fill: CSS.vars ['grey--darker']}]),
   ['.account-sub-menu', {
      display: 'none',
      'flex-direction': 'column',
      position: 'absolute',
      top: 23,
      right: -10,
      width: 200,
      background: '#fff',
      'padding-left, padding-right': CSS.vars ['padding--m'],
      'padding-top': CSS.typography.spaceVer (0.6),
      'padding-bottom': CSS.typography.spaceVer (0.7),
      'border-radius': CSS.vars ['border-radius--m'],
      'box-shadow': '0 0 20px rgba(0, 0, 0, 0.15)',
   }],
   ['.account-menu__item:hover > .account-sub-menu', {display: 'flex'}],
   ['.account-sub-menu__item-link', {
      color: CSS.vars ['grey--link'],
      transition: CSS.vars.easeOutQuart,
   }],
   media ('screen and (min-width: 1025px)', ['.account-sub-menu__item-link:hover', {color: CSS.vars ['color--one']}]),
   // *** hamburger.scss ***
   ['.hamburger', {
      position: 'relative',
      display: 'none',
      'align-items': 'center',
      'width, height': 50,
      padding: 0
   }],
   media ('screen and (max-width: 767px)', ['.hamburger', {display: 'flex'}]),
   ['.hamburger__inner', {
      position: 'absolute',
      display: 'inline-block',
      height: 14,
      width: 28,
      left: 11,
      transition: 'all ' + CSS.vars.easeOutQuart,
   }],
   ['.hamburger__stroke', {
      background: '#fff',
      height: 2,
      width: 1,
      'border-radius': 2,
      position: 'absolute',
      left: '0px',
      transition: 'transform ' + CSS.vars.easeOutQuart + ' 0.45s, opacity 0.3s linear',
   }],
   ['.hamburger__stroke-1', {top: 0}],
   ['.hamburger__stroke-2', {top: 6}],
   ['.hamburger__stroke-3', {top: 12}],
   ['.active-mobile-menu', [
      ['.hamburger__inner', {transform: 'rotate(180deg)'}],
      ['.hamburger__stroke-1', {transform: 'rotate(-45deg) translateY(5px) translateX(-4px)'}],
      ['.hamburger__stroke-2', {transform: 'rotate(45deg)', opacity: '0.2'}],
      ['.hamburger__stroke-3', {transform: 'rotate(45deg) translateY(-4px) translateX(-4px)'}],
   ]],
   // *** sidebar.scss ***
   ['.sidebar', {
      position: 'fixed',
      'z-index': '99',
      left: 0,
      top: 58, // height main header
      'padding-bottom': 54, // height sidebar search
      width: CSS.vars ['sidebar-width'],
      display: 'flex',
      'flex-direction': 'column',
      'border-right': CSS.vars ['border-color'] + ' 1px solid',
      height: 'calc(100vh - 58px)',
      'background-color': '#fff',
      'overflow-x': 'hidden',
   }],
   ['.sidebar__inner', {
      width: '200%',
      display: 'flex',
      'flex-wrap': 'nowrap',
      transition: CSS.vars.easeOutQuad,
      'transition-duration': '500ms',
   }],
   ['.app-organise .sidebar__inner', {transform: 'translateX(-50%)'}],
   ['.sidebar__inner-section', {width: 0.5, position: 'relative'}],
   // Sidebar coherent paddings
   ['.sidebar__header, .sidebar__tags, .sidebar__tip', {'padding-left, padding-right': CSS.vars ['padding--m']}],
   ['.sidebar__attach-form, .sidebar__switch', {
      'padding-left, padding-right':  'calc(' + CSS.vars ['padding--m'] + 'px - 6px)' // has smaller padding for optic correction of round shape
   }],
   // Sidebar close section
   ['.sidebar__close-section-button', {
      position: 'absolute',
      'top, right': 0,
      'z-index': '1'
   }],
   // Sidebar header
   ['.sidebar__header', {'padding-top, padding-bottom': CSS.typography.spaceVer (1.5)}],
   // Sidebar title
   ['.sidebar__section-title', {'margin-bottom': CSS.typography.spaceVer (0.5), 'padding-left': CSS.vars ['padding--xs']}],
   ['.sidebar__attach-form', {'margin-top, margin-bottom': CSS.typography.spaceVer (1)}],
   // Sidebar switch
   ['.sidebar__switch', {'margin-bottom': CSS.typography.spaceVer (1)}],
   // Sidebar footer
   ['.sidebar__footer', {
      position: 'absolute',
      'bottom, left': 0,
      height: 54,
      width: 1,
      display: 'flex',
      'align-items': 'center',
      'border-top': '1px solid ' + CSS.vars ['border-color'],
   }],
   // Sidebar -- Attach tags
   ['.app-attach-tags', [
      ['.sidebar__attach-form', {display: 'block'}],
      ['.sidebar__section-title--untag', {display: 'none'}],
   ]],
   // Sidebar -- untag tags
   ['.app-untag-tags', [
      ['.sidebar__attach-form', {display: 'none'}],
      ['.sidebar__section-title--attach', {display: 'none'}],
   ]],
   // *** sidebar-header.scss ***
   ['.sidebar-header', {position: 'relative'}],
   // Sidebar header -- selected tags
   ['.sidebar-header__filter-selected', {
      position: 'absolute',
      top: 0.5,
      right: 0,
      cursor: 'pointer',
      opacity: '0.5',
      transition: 'opacity 250ms linear',
   }],
   ['.sidebar-header__filter-selected:hover', {opacity: '1'}],
   ['.sidebar-header__filter-selected-icon', {
      display: 'inline-block',
      'width, height': 24,
      'margin-top': -12, // center
      fill: CSS.vars ['grey--darker'],
   }],
   ['.app-selected-tags', [
      ['.sidebar-header__filter-selected', {opacity: '1'}],
      ['.sidebar-header__filter-selected-icon', {fill: CSS.vars ['color--one']}],
   ]],
   // Sidebar title
   ['.sidebar-header__title', {'font-size': CSS.typography.fontSize (3)}],
   // *** sidebar-search.scss
   ['.sidebar-search', {
      position: 'relative',
      display: 'flex',
      'width, height': 1,
   }],
   ['.sidebar-search__input', {'padding-left, padding-right': CSS.vars ['padding--m']}],
   ['.sidebar-search__icon', {
      position: 'absolute',
      right: CSS.vars ['padding--s'],
      top: 0.5,
      'margin-top': -12,
      'width, height': 24,
      display: 'inline-block',
   }, ['path', {fill: CSS.vars ['grey--link']}]],
   // *** switch.scss ***
   ['.switch', {
      padding: 4,
      display: 'inline-block',
      position: 'relative',
      'border-radius': 100,
      background: CSS.vars ['highlight--neutral'],
      transition: CSS.vars.easeOutQuart,
   }],
   ['.app-selected-tags .switch', {background: CSS.vars ['highlight--selection']}],
   ['.app-attach-tags .switch', {background: CSS.vars ['highlight--positive']}],
   ['.app-untag-tags .switch', {background: CSS.vars ['highlight--negative']}],
   ['.switch::after', {
      content: "''",
      background: '#fff',
      'border-radius': 100,
      position: 'absolute',
      'top, left': 4,
      height: 'calc(100% - 8px)',
      'z-index': 0,
      transition: CSS.vars.easeOutQuart,
   }],
   ['.app-all-tags .switch::after', {left: 4, width: 98}],
   ['.app-selected-tags .switch::after', {left: 101, width: 130}],
   ['.app-attach-tags .switch::after', {left: 4, width: 125}],
   ['.app-untag-tags .switch::after', {left: 128, width: 110}],
   ['.switch-list', {
      position: 'relative',
      'z-index': '1',
      width: 1,
      display: 'flex',
      'justify-content': 'space-between',
   }],
   ['.switch-list__button', {
      height: 38,
      'padding-left': CSS.vars ['padding--xs'],
      'padding-right': CSS.vars ['padding--m'],
      display: 'flex',
      'align-items': 'center',
      color: CSS.vars ['grey--link'],
      cursor: 'pointer',
      'white-space': 'nowrap',
   }],
   ['.switch-list__button-icon', {
      display: 'inline-block',
      'width, height': 24,
      'margin-right': 2,
   }, ['path', {fill: CSS.vars ['grey--link']}]],
   media ('screen and (min-width: 1025px)', [
      ['.switch-list__button:hover .switch-list__button-text', {color: CSS.vars ['grey--darker']}, [
         ['.switch-list__button-icon path', {fill: CSS.vars ['grey--darker']}],
      ]],
   ]),
   // *** attach_form.scss ***
   ['.attach-form__title', {
      'padding-left': 10,
      'margin-bottom': CSS.typography.spaceVer (0.5),
   }],
   // *** main.scss **
   // Main (where all the content comes)
   ['.main', {
      'padding-top': 58, // header height
      'padding-left': CSS.vars ['sidebar-width'], // sidebar width
      display: 'flex',
      'flex-direction': 'column',
      'width, height': 1,
      transition: CSS.vars.easeOutQuart,
   }],
   ['.app-organise .main', {background: CSS.vars ['grey--lightest']}],
   ['.app-show-organise-bar .main', {
      transform: 'translateY(58px)' // header height
   }],
   ['.main__inner', {
      'margin-top': CSS.typography.spaceVer (1.5),
      'padding-left, padding-right': CSS.vars ['padding--l'],
   }],
   ['.main--pictures .main__inner', {'padding-right': 0}],
   // *** main-centered.scss ***
   ['.main-centered', {
      'padding-top': 58, // header height
      display: 'flex',
      'flex-direction': 'column',
      width: 1,
      'align-items': 'center',
   }],
   ['.main-centered__inner', {
      display: 'flex',
      'flex-direction': 'column',
      width: 1,
   }],
   // *** guide.scss ***
   ['.guide', {
      display: 'flex',
      'flex-direction': 'column',
      'justify-content, align-items': 'flex-start',
      'max-width': 510,
      width: 1,
   }],
   ['.guide__image', {'margin-bottom': CSS.typography.spaceVer (0.5)}],
   ['.guide__title', {
      'font-size': CSS.typography.fontSize (7),
      'line-height': CSS.typography.spaceVer (1.75),
      'margin-bottom': CSS.typography.spaceVer (0.5),
   }],
   ['.guide__text', {
      'font-size': CSS.typography.fontSize (1),
      'margin-bottom': CSS.typography.spaceVer (1),
   }],
   // *** page-header.scss ***
   ['.page-header', {
      'margin-top': CSS.typography.spaceVer (4),
      'margin-bottom': CSS.typography.spaceVer (1.5),
   }],
   // *** page-section.scss ***
   ['.page-section', {
      display: 'block',
      width: 1,
      'margin-bottom': CSS.typography.spaceVer (4),
   }],
   // *** tip.scss ***
   ['.tip', {
      display: 'flex',
      'flex-direction': 'column',
      color: CSS.vars ['grey--darker'],
   }],
   ['.tip__header', {
      display: 'flex',
      'align-items': 'center',
      'margin-bottom': CSS.typography.spaceVer (0.25),
   }],
   ['.tip__icon', {'margin-right': CSS.vars ['padding--xs']}],
   ['.tip__title', {
      mixin1: CSS.vars.fontPrimaryMedium,
      'margin-top': '1px',
   }],
   ['.tip__text', {mixin1: CSS.vars.fontPrimaryItalic}, ['a', {
      color: CSS.vars ['grey--darker'],
      'text-decoration': 'underline',
   }]],
   media ('screen and (min-width: 1025px)', ['.tip__text a:hover', {color: CSS.vars ['color--one']}]),
   // *** search-form.scss ***
   // Drag and drop
   ['.search-form', {
      display: 'flex',
      width: 1,
      position: 'relative',
   }],
   ['.search-form__input', {
      display: 'block',
      'height, line-height': 42,
      'border-radius': 100,
      border: '1px solid ' + CSS.vars ['border-color--dark'],
   }],
   ['.search-form__icon', {
      position: 'absolute',
      right: CSS.vars ['padding--s'],
      top: 0.5,
      'margin-top': -12,
      'width, height': 24,
      display: 'inline-block',
   }, ['path', {fill: CSS.vars ['grey--link']}]],
   ['.search-form__dropdown', {
      position: 'absolute',
      'z-index': '1',
      left: 0.02,
      top: 41, // height input
      width: 0.96,
      height: 'auto',
      'max-height': 120,
      'overflow-y': 'auto',
      'border-radius': CSS.vars ['border-radius--m'],
      'box-shadow': '0 0 10px rgba(0, 0, 0, 0.15)',
      display: 'none',
   }],
   ['.search-form:hover .search-form__dropdown', {display: 'block'}],
   // *** tag-list-horizontal.scss ***
   // Tag list bar (above pictures)
   ['.tag-list-horizontal', {
      display: 'flex',
      width: 1,
      'align-items': 'center',
   }],
   ['.tag-list-horizontal .tag-list-horizontal__item', {
      width: 'auto',
      'margin-right': CSS.vars ['padding--m'],
      display: 'inline-flex',
      'white-space': 'nowrap',
      'margin-top': CSS.typography.spaceVer (0.25),
   }],
   // *** tag-list-extended.scss ***
   // Tag list extended
   ['.tag-list-extended', {
      width: 1,
      'list-style-type': 'none',
      display: 'flex',
      'flex-direction': 'column'
   }],
   ['.tag-list-extended__item', {
      display: 'flex',
      'align-items': 'flex-start',
      'padding-left': CSS.vars ['padding--s'],
      'padding-top, padding-bottom': CSS.typography.spaceVer (0.5),
      'border-bottom': '1px ' + CSS.vars ['border-color'] + ' solid',
      cursor: 'pointer',
      position: 'relative',
      transition: CSS.vars.easeOutQuart,
      overflow: 'hidden',
      'font-size': CSS.typography.fontSize (1)
   }],
   ['.tag-list-extended__item-info', {
      position: 'absolute',
      display: 'flex',
      'flex-direction': 'column',
      width: 1,
      height: 'auto',
      top: CSS.typography.spaceVer (1),
      'padding-left': 27,
      'padding-right': CSS.vars ['padding--m'],
      'font-size': CSS.typography.fontSize (0),
   }],
   ['.tag-list-extended__item-info-buttons', {
      display: 'flex',
      'justify-content': 'space-between',
      'margin-bottom': CSS.typography.spaceVer (1.5),
   }],
   // *** tag-list-dropdown.scss ***
   // Tag list dropdown
   ['.tag-list-dropdown', {
      background: '#fff',
      width: 1,
      'list-style-type': 'none',
   }, [
      ['.tag-list-dropdown__item', {
         display: 'flex',
         'padding-left': CSS.vars ['padding--s'],
         'padding-top, padding-bottom': CSS.typography.spaceVer (0.5),
      }],
      ['.tag-list-dropdown__item:hover', {background: CSS.vars ['grey--lightest']}],
   ]],
   // *** tag-list.scss ***
   // Tag list -- Sidebar
   ['.tag-list', {
      display: 'block',
      width: 1,
      'list-style-type': 'none',
   }],
   ['.tag-list__item', {
      display: 'flex',
      'align-items': 'center',
      cursor: 'pointer',
      'margin-bottom': CSS.typography.spaceVer (0.5),
   }],
   // Tag list -- Sidebar -- Only selected tags
   ['.app-selected-tags .tag-list--sidebar', [
      ['.tag', {display: 'none'}],
      ['.tag--selected', {display: 'flex'}],
   ]],
   // Tag list -- Sidebar -- only attached tags (Untag)
   ['.app-untag-tags .tag-list--attach', [
      ['.tag', {display: 'none'}],
      ['.tag--attached', {display: 'flex'}],
   ]],
   // *** tag.scss ***
   // Tag
   ['.tag', {
      display: 'flex',
      'align-items': 'center',
      position: 'relative',
      width: 1,
      color: 'rgba(' + CSS.toRGBA (CSS.vars ['grey--darker']) + ', 0.8)',
      transition: '250ms linear color',
   }],
   ['.sidebar .tag:hover, .tag--selected', {'color, fill': CSS.vars ['grey--darker']}],
   ['.tags-list-extended .tag', {color: CSS.vars ['grey--darker']}],
   // Tag icon
   ['.tag__icon', {
      display: 'inline-block',
      'width, height': 24,
      'margin-right': 3,
   }],
   ['.tag__icon--all path', {fill: CSS.vars ['grey--darker']}],
   ['.tag__icon--untagged path', {fill: 'transparent', stroke: CSS.vars ['grey--darker']}],
   // Tag title
   ['.tag__title', {
      mixin1: CSS.vars.fontPrimaryMedium,
      'margin-right': CSS.vars ['padding--xs'],
   }],
   // Tag title - amount
   ['.tag__title-amount', {
      'white-space': 'nowrap',
      mixin1: CSS.vars.fontPrimaryRegular,
   }],
   // Tag info
   ['.tag__status', {display: 'flex'}],
   ['.tag__status-icon', {
      display: 'inline-block',
      'width, height': 24,
   }, ['path', {fill: CSS.vars ['grey--darker']}]],
   // *** tag-actions.scss ***
   // Tag actions
   ['.tag-actions', {
      position: 'absolute',
      display: 'inline-block',
      top: 0.5,
      right: 0,
      transform: 'translateY(-50%)',
      'width, height': 24,
      'border-radius': 20,
      transition: CSS.vars.easeOutQuart,
   }],
   // tag list horizontal
   ['.tag-list-horizontal .tag-actions', {
      position: 'relative',
      'top, right': 'auto',
      transform: 'none',
   }],
   ['.tag-actions__item', {
      display: 'none',
      cursor: 'pointer',
      'border-radius': 100,
   }],
   // tag list horizontal
   ['.tag-list-horizontal .tag-actions__item', {
      display: 'inline-block',
      'margin-left': CSS.vars ['padding--xs'],
   }],
   // Tag actions - items
   ['.tag-actions__item--attach', {
      'background-color': CSS.vars ['grey--lighter'],
      fill: CSS.vars.grey,
   }, ['&:hover', {fill: CSS.vars ['grey--darker']}]],
   ['.tag-actions__item--deselect', {
      'background-color': CSS.vars ['grey--lighter'],
      fill: CSS.vars.grey,
   }, ['&:hover', {fill: CSS.vars ['grey--darker']}]],
   ['.tag-actions__item--attached', {
      'background-color': CSS.vars ['color--attach'],
      fill: '#fff',
   }],
   ['.tag-actions__item--untag', {
      'background-color': CSS.vars ['color--remove'],
      fill: '#fff',
   }],
   ['.tag-actions__item-icon', {
      display: 'inline-block',
      'width, height': 24,
   }],
   // Tag actions -- View pictures
   ['.app-pictures', [
      // Selected tag
      ['.tag--selected .tag-actions__item--selected', {display: 'flex'}],
      // Deselect tag
      ['.tag--selected .tag-actions:hover', [
         ['.tag-actions__item--selected', {display: 'none'}],
         ['.tag-actions__item--deselect', {display: 'flex'}],
      ]],
      // All pictures tag
      // (has no hover because you can't deselect it)
      ['.tag--all-pictures.tag--selected:hover', [
         ['.tag-actions__item--selected', {display: 'flex'}],
         ['.tag-actions__item--deselect', {display: 'none'}],
      ]],
   ]],
   // Tag actions -- Attach tags
   ['.app-attach-tags', [
      ['.tag-actions__item--attach', {display: 'flex'}],
      // tag hover
      ['.tag-actions:hover', [
         ['.tag-actions__item--attach', {display: 'none'}],
         ['.tag-actions__item--attached', {display: 'flex'}],
      ]],
      // tag attached
      ['.tag--attached', [
         ['.tag-actions__item--attach', {display: 'none'}],
         ['.tag-actions__item--attached', {display: 'flex'}],
      ]],
   ]],
   // Tag actions -- Untag
   ['.app-untag-tags', [
      ['.tag-actions__item--attached', {display: 'flex'}],
      ['.tag-actions:hover', [
         ['.tag-actions__item--attached', {display: 'none'}],
         ['.tag-actions__item--untag', {display: 'flex'}],
      ]],
   ]],
   // *** tag-share.scss ***
   // Tag shared
   ['.tag-share', {
      display: 'flex',
      width: 1,
      'margin-top': CSS.typography.spaceVer (0.5),
      'margin-bottom': CSS.typography.spaceVer (1),
   }],
   ['.tag-share__item', {
      display: 'inline-flex',
      'align-items, justify-content': 'center',
      'width, height': 36,
      'margin-right': 4,
      'background-color': 'rgba(' + CSS.toRGBA (CSS.vars.grey) + ', 0.1)',
      'border-radius': 100,
      overflow: 'hidden',
   }],
   ['.tag-share__item:hover', {'background-color': 'rgba(' + CSS.toRGBA (CSS.vars.grey) + ', 0.15)'}],
   ['.tag-share__item-icon', {
      display: 'inline-block',
      'width, height': 24,
   }, ['path', {
      fill: 'rgba(' + CSS.toRGBA (CSS.vars ['grey--darker']) + ', 0.7)',
      transition: '250ms linear all',
   }]],
   ['.tag-share__item:hover path', {fill: CSS.vars ['grey--darker']}],
   ['.tag-share__item-img', {
      display: 'inline-block',
      'width, height': 36,
   }],
   // *** back-link.scss
   // Back link
   ['.back-link--uploads', {
      'border-bottom': CSS.vars.grey + ' 1px solid',
      'padding-bottom': CSS.typography.spaceVer (1),
   }],
   ['.back-link__link', {
      display: 'flex',
      'align-items': 'center',
      color: CSS.vars ['grey--darker'],
      transition: CSS.vars.easeOutQuart,
   }],
   ['.back-link__icon', {
      display: 'inline-block',
      'width, height': 24,
      transition: CSS.vars.easeOutQuart,
   }, ['path', {
      fill: CSS.vars ['grey--darker'],
      transition: CSS.vars.easeOutQuart,
   }]],
   media ('screen and (min-width: 1025px)', [
      ['.back-link__link:hover', {color: CSS.vars ['color--one']}, [
         ['.back-link__icon', {transform: 'translateX(-4px)'}, ['path', {fill: CSS.vars ['color--one']}]],
      ]],
   ]),
   // *** dropdown.scss ***
   ['.dropdown', {
      position: 'relative',
      'z-index': '1',
   }],
   ['.dropdown__button', {
      mixin1: CSS.vars.fontPrimaryMedium,
      position: 'relative',
      'padding-right': 20,
      color: CSS.vars.grey,
      cursor: 'pointer',
      transition: CSS.vars.easeOutQuart,
   }, ['&::after', {
      content: "''",
      position: 'absolute',
      top: 0.5,
      'right, width, height': 0,
      'margin-top': -2,
      'border-style': 'solid',
      'border-width': '4px 4px 0 4px',
      'border-color': CSS.vars.grey + ' transparent transparent transparent',
      transition: CSS.vars.easeOutQuart,
   }]],
   ['.dropdown__button:hover', {color: CSS.vars ['grey--darker']}, ['&::after', {
      'border-color': CSS.vars ['grey--darker'] + ' transparent transparent transparent',
   }]],
   ['.dropdown:hover .dropdown__list', {display: 'block'}],
   ['.dropdown__list', {
      display: 'none',
      position: 'absolute',
      top: 20,
      right: 0,
      background: '#fff',
      'border-radius': CSS.vars ['border-radius--m'],
      'box-shadow': '0 0 20px rgba(0, 0, 0, 0.15)',
      'padding-left, padding-right': CSS.vars ['padding--m'],
      'padding-top': CSS.typography.spaceVer (0.6),
      'padding-bottom': CSS.typography.spaceVer (0.7),
   }],
   ['.dropdown__list-item', {
      'margin-bottom, margin-top': CSS.typography.spaceVer (0.25),
      color: CSS.vars.grey,
      transition: CSS.vars.easeOutQuart,
      cursor: 'pointer',
   }],
   ['.dropdown__list-item:hover', {color: CSS.vars ['grey--darker']}],
   // *** upload-box-list.scss ***
   // Upload list
   ['.upload-box-list', {
      display: 'flex',
      'flex-direction': 'column',
      'margin-bottom': CSS.typography.spaceVer (3),
   }],
   ['.upload-box-list__item', {
      display: 'block',
      'margin-bottom': CSS.typography.spaceVer (2),
   }],
   // *** upload-box.scss
   ['.upload-box', {
      display: 'flex',
      border: '1px solid ' + CSS.vars ['border-color--dark'],
      'border-radius': CSS.vars ['border-radius--m'],
      'padding-left': CSS.vars ['padding--m'],
      'padding-right': CSS.vars ['padding--l'],
      'padding-top, padding-bottom': CSS.typography.spaceVer (1),
   }],
   ['.upload-box__image', {
      display: 'flex',
      'align-items, justify-content': 'center',
      'width, height': 80,
      'margin-right': CSS.vars ['padding--l'],
      'border-radius': 100,
      background: CSS.vars ['grey--lighter'],
   }],
   ['.upload-box__image-icon', {
      'width, height': 24,
      display: 'inline-block',
      transform: 'scale(1.5)',
   }, ['path', {fill: CSS.vars.grey}]],
   ['.upload-box__main', {
      display: 'flex',
      flex: '1',
      'flex-direction': 'column',
      'padding-top': 5,
   }],
   ['.upload-box__section', {
      width: 1,
      display: 'flex',
      'flex-direction': 'column',
      'margin-bottom': CSS.typography.spaceVer (1.25),
   }, ['&:last-of-type', {'margin-bottom': 0}]],
   ['.upload-box--recent-uploads .upload-box__section', {'margin-bottom': CSS.typography.spaceVer (0.5)}],
   ['.upload-box__selection', {
      display: 'block',
      'margin-top': CSS.typography.spaceVer (1),
   }],
   ['.upload-box__search', {'margin-bottom': CSS.typography.spaceVer (0.25)}],
   ['.upload-box__section--buttons', {'margin-bottom': CSS.typography.spaceVer (1)}],
   ['.upload-box__section-title', {
      'font-size': CSS.typography.fontSize (1),
      'line-height': CSS.typography.spaceVer (1.25),
      'margin-bottom': CSS.typography.spaceVer (0.5),
   }],
   ['.upload-box--recent-uploads .upload-box__section-title', {'margin-bottom': 0}],
   ['.upload-box__section-title-note', {
      mixin1: CSS.vars.fontPrimaryItalic,
      color: CSS.vars.grey,
   }],
   ['.upload-box__upload-button', {'margin-left': 'auto'}],
   // *** drag-and-drop.scss ***
   // Drag and drop
   ['.drag-and-drop', {
      display: 'flex',
      'flex-direction': 'column',
      'justify-content, align-items': 'center',
      width: 1,
      border: '1px dashed ' + CSS.vars ['border-color--dark'],
      'border-radius': CSS.vars ['border-radius--m'],
      'padding-left, padding-right': CSS.vars ['padding--m'],
      'padding-top, padding-bottom': CSS.typography.spaceVer (1.5),
   }],
   ['.drag-and-drop__icon', {
      display: 'inline-block',
      width: 25,
      height: 33,
      'margin-bottom': CSS.typography.spaceVer (0.25),
   }, ['path', {fill: CSS.vars ['grey--light']}]],
   ['.drag-and-drop__text', {
      color: CSS.vars.grey,
      'text-align': 'center',
      display: 'inline-block',
      'max-width': 230,
   }],
   // *** upload-progress.scss ***
   // Upload progress
   ['.upload-progress', {
      color: CSS.vars ['color--one'],
      display: 'flex',
      'align-items': 'center',
      mixin1: CSS.vars.fontPrimaryMedium,
   }],
   ['.upload-progress__icon', {
      display: 'inline-block',
      'width, height': 24,
      'margin-right': 7,
   }, ['path', {fill: CSS.vars ['color--one']}]],
   // *** progress-bar.scss ***
   ['.progress-bar', {
      width: 1,
      height: 4,
      display: 'block',
      'margin-top, margin-bottom': CSS.typography.spaceVer (0.5),
      background: CSS.vars ['grey--lighter'],
      'border-radius': 100,
      overflow: 'hidden',
      position: 'relative',
   }],
   ['.progress-bar__progress', {
      position: 'absolute',
      'top, left': 0,
      background: CSS.vars ['color--one'],
      height: 1,
      // width: 0.2,
      'border-radius': 100,
   }],
   // *** recent-uploads.scss ***
   // Recent uploads
   ['.recent-uploads__title', {
      'font-size': CSS.typography.fontSize (5),
      'line-height': CSS.typography.spaceVer (1.5),
      'margin-bottom': CSS.typography.spaceVer (1),
   }],
   ['.recent-uploads__list-item', {
      display: 'block',
      'margin-bottom': CSS.typography.spaceVer (1),
   }],
   // *** upload-selection.scss ***
   ['.upload-selection', {
      background: '#fff',
      'box-shadow': '0 0 10px rgba(0, 0, 0, 0.12)',
      'padding-left': CSS.vars ['padding--m'],
      'padding-right': CSS.vars ['padding--s'],
      'padding-top, padding-bottom': CSS.typography.spaceVer (0.75),
      display: 'flex',
      'align-items': 'center',
      'border-radius': CSS.vars ['border-radius--l'],
      color: CSS.vars ['color--one'],
   }],
   ['.upload-selection__icon', {
      display: 'inline-block',
      'width, height': 24,
      'margin-right': CSS.vars ['padding--xs'],
   }, ['path', {fill: CSS.vars ['color--one']}]],
   ['.upload-selection__text', {mixin1: CSS.vars.fontPrimaryMedium}],
   ['.upload-selection__remove', {'margin-left': 'auto'}],
   // *** pictures-header.scss ***
   ['.pictures-header', {
      'margin-bottom': CSS.typography.spaceVer (2),
      'padding-right': CSS.vars ['padding--m'],
   }],
   ['.pictures-header__action-bar', {
      'margin-top': CSS.typography.spaceVer (0.5),
      display: 'flex',
      width: 1,
      'align-items': 'center',
   }],
   ['.pictures-header__selected-tags', {display: 'inline-flex'}],
   ['.pictures-header__sort', {
      display: 'inline-flex',
      'margin-left': 'auto',
   }],
   // *** pictures-grid.scss ***
   ['.pictures-grid', {
      display: 'flex',
      'flex-direction': 'row',
      'flex-wrap': 'wrap',
      'justify-content': 'flex-start',
      width: 1,
   }],
   ['.pictures-grid__item', {
      display: 'inline-flex',
      height: 140,
      'padding-right': 16,
      'padding-bottom': 18,
      position: 'relative',
   }],
   ['.pictures-grid__item', {width: 100}],
   ['.pictures-grid__item:nth-child(4n+12)', {width: 240}],
   ['.pictures-grid__item:nth-child(3n+0)', {width: 180}],
   ['.pictures-grid__item:nth-child(5n+7)', {width: 140}],
   ['.pictures-grid__item-picture', {
      background: CSS.vars ['grey--light'],
      'width, height': 1,
      'border-radius': CSS.vars ['border-radius--l'],
      position: 'relative',
      transition: CSS.vars.easeOutQuart,
      'transition-duration': '200ms',
      cursor: 'pointer',
   }],
   ['.pictures-grid__item-picture::after', {
      content: '""',
      position: 'absolute',
      'top, right': -8,
      'width, height': 16,
      'border-radius': 20,
      display: 'inline-block',
      background: CSS.vars ['color--one'],
      opacity: '0',
      transition: '100ms linear',
   }],
   ['.pictures-grid__item-picture.selected', {transform: 'scale(0.8)'}, [
      ['&::after', {opacity: '1', transition: '100ms linear'}]
   ]],
   // *** organise-bar.scss ***
   ['.organise-bar', {
      position: 'fixed',
      'z-index': '1',
      top: 58, // header height
      left: 0,
      width: 1,
      height: 'auto',
      transform: 'translateY(-100%)',
      transition: CSS.vars.easeOutQuart,
   }],
   ['.app-show-organise-bar .organise-bar', {transform: 'none'}],
   ['.organise-bar__inner', {
      background: 'white',
      width: 1,
      display: 'flex',
      'align-items': 'center',
      height: 50,
      'border-bottom': '1px solid ' + CSS.vars ['grey--lighter'],
      'padding-left': CSS.vars ['sidebar-width'] + CSS.vars ['padding--l'],
      'padding-right': CSS.vars ['padding--m'],
   }],
   ['.organise-bar__selected', {
      display: 'flex',
      'flex-wrap': 'nowrap',
      'align-items': 'center',
   }],
   ['.organise-bar__selected-title', {'margin-left': CSS.vars ['padding--xs']}],
   ['.organise-bar__button', {
      display: 'inline-flex',
      'align-items': 'center',
      opacity: '0.5',
      transition: 'linear 250ms all',
      cursor: 'pointer',
      'margin-left': CSS.vars ['padding--m'],
   }],
   ['.organise-bar__button--delete', {
      'margin-left': 'auto',
      'background-color': 'rgba(' + CSS.toRGBA (CSS.vars ['color--remove']) + ', 0.05)',
      'padding-left': 10,
      'padding-right': 14,
      'border-radius': 100,
      height: 32,
      color: 'rgba(' + CSS.toRGBA (CSS.vars ['color--remove']) + ', 0.7)',
      opacity: '1',
   }, [
      ['&:hover', {'background-color': 'rgba(' + CSS.toRGBA (CSS.vars ['color--remove']) + ', 0.1)'}],
      ['.organise-bar__button-icon path', {fill: 'rgba(' + CSS.toRGBA (CSS.vars ['color--remove']) + ', 0.7)'}],
   ]],
   ['.organise-bar__button:hover', {opacity: '1'}],
   ['.organise-bar__button-title', {'margin-left': 4}],
   ['.organise-bar__button-icon-container', {
      'border-radius': 100,
      'background-color': CSS.vars ['grey--lighter'],
      'height, width': 24,
      display: 'inline-block',
   }],
   ['.organise-bar__button-icon', {
      display: 'inline-block',
      'width, height': 24,
      fill: CSS.vars ['grey--darker'],
   }],
   // *** selected-box.scss ***
   // Selected box (in organise bar)
   ['.selected-box', {
      position: 'relative',
      background: CSS.vars ['color--one'],
      'border-radius': 12,
      'min-width, min-height': 22,
      'padding-top': '1px',
      'padding-left, padding-right': 5,
      color: '#fff',
      display: 'flex',
      'align-items, justify-content': 'center',
   }],
   ['.selected-box__close', {
      position: 'absolute',
      'z-index': '1',
      'top, left': 0.5,
      'width, height': 24,
      'margin-top, margin-left': -12,
      display: 'none',
      cursor: 'pointer',
   }],
   ['.selected-box__close-icon path', {fill: '#fff'}],
   ['.selected-box:hover', [
      ['.selected-box__close', {display: 'inline-block'}],
      ['.selected-box__count', {opacity: 0}],
   ]],
   // *** show-hidden.scss ***
   // Show hidden
   ['.show-hidden', {
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'flex-end',
      cursor: 'pointer',
      'margin-bottom': CSS.typography.spaceVer (0.5),
   }],
   ['.show-hidden__icon', {
      display: 'none',
      'width, height': 24,
   }, ['path', {fill: CSS.vars ['grey--darker']}]],
   ['.show-hidden__icon--open path', {fill: CSS.vars ['color--one']}],
   ['.show-hidden__title-status', {display: 'none'}],
   ['.app-tags-hidden', [
      ['.show-hidden__icon--closed', {display: 'inline-block'}],
      ['.show-hidden__title-status--show', {display: 'inline-block'}],
   ]],
   ['.app-tags-hidden-open', [
      ['.show-hidden__icon--open', {display: 'inline-block'}],
      ['.show-hidden__title-status--closed', {display: 'inline-block'}],
   ]],
   // *** tags-search-bar.scss ***
   ['.tags-search-bar', {
      position: 'relative',
      display: 'block',
      'margin-bottom': CSS.typography.spaceVer (2),
   }],
   ['.tags-search-bar__search-input', {
      border: '1px solid ' + CSS.vars ['border-color'],
      'border-radius': 100,
      'padding-left': 42,
      mixin1: CSS.vars.fontPrimaryItalic,
      'line-height, height': 46
   }],
   ['.tags-search-bar__search-icon', {
      position: 'absolute',
      top: 0.5,
      left: 14,
      'width, height': 24,
      'margin-top': -12,
      'pointer-events': 'none',
   }],
   ['.tags-search-bar__search-icon path', {fill: CSS.vars.grey}],
   ['.tags-search-bar__shared', {
      position: 'absolute',
      right: 18,
      top: 0.5,
      transform: 'translateY(-50%)',
      color: CSS.vars ['grey--darker'],
      opacity: '0.6',
      display: 'flex',
      'align-items': 'center',
      cursor: 'pointer'
   }],
   ['.app-shared-tags-filtered .tags-search-bar__shared', {
      opacity: '1',
      color: CSS.vars ['color--one'],
   }],
   ['.tags-search-bar__shared-icon', {
      'width, height': 24,
      display: 'inline-block',
      'margin-right': 4,
   }, ['path', {fill: CSS.vars ['grey--darker']}]],
   ['.app-shared-tags-filtered .tags-search-bar__shared-icon path', {fill: CSS.vars ['color--one']}],
   // *** popup.scss ***
   ['.popup', {
      position: 'fixed',
      'height, width': 1,
      'top, left': 0,
      background: 'rgba(' + CSS.toRGBA (CSS.vars ['grey--darkest']) + ', 0.9)',
      'z-index': '10000',
      display: 'flex',
      'justify-content, align-items': 'center',
      'overflow-y': 'auto',
      'pointer-events': 'none',
      opacity: 0,
      transition: 'all ' + CSS.vars.easeOutQuart,
   }],
   ['.app-popup .popup', {
      opacity: '1',
      'pointer-events': 'all',
   }],
   ['.popup__close', {
      position: 'absolute',
      top: 20,
      right: 24,
   }],
   // *** popup-box.css ***
   ['.popup-box', {
      background: 'rgba(255, 255, 255, 0.9)',
      'max-width': 520,
      width: 1,
      'min-height': 100,
      'text-align': 'center',
      'box-shadow': '0 0 10px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
   }],
   // *** close-button.scss ***
   // Close button
   ['.close-button', {
      display: 'flex',
      'width, height': 48,
      position: 'relative',
      'align-items, justify-content': 'center',
      cursor: 'pointer',
   }],
   // --- close  button--small --- //
   ['.close-button--small', {'width, height': 22}],
   ['.close-button__inner', {
      display: 'inline-block',
      position: 'relative',
      'width, height': 32,
   }],
   // --- close  button--small inner --- //
   ['.close-button--small .close-button__inner', {'width, height': 12}],
   ['.close-button__line', {
      position: 'absolute',
      'top, left': 0.5,
      'margin-left': -0.5,
      display: 'inline-block',
      width: 1,
      height: '1px',
      'background-color': '#000',
      transform: 'rotate(-45deg)',
      transition: 'all ' + CSS.vars.easeOutQuart,
   }],
   ['.close-button__line:last-child', {transform: 'rotate(45deg)'}],
   media ('screen and (min-width: 1025px)', ['.close-button:hover .close-button__line', {'background-color': '#ccc'}]),
   // *** cross.scss ***
   ['.cross-button', {
      display: 'inline-flex',
      'justify-content, align-items': 'center',
      cursor: 'pointer',
      'width, height': 32,
   }, [
      CSS.vars.cross ('.cross-button__cross', 16, CSS.vars.grey),
      ['&:hover .cross-button__cross', CSS.vars.crossHover ()],
   ]],
   // ------ Cross button big (in sidebar) ------ //
   ['.cross-button--big', {
      'width, height': 48
   }, CSS.vars.cross ('.cross-button__cross', 24, CSS.vars.grey)],
   // ------ Remove tag ( in upload-box ) ------ //
   ['.cross-button--remove-tag', {
      'width, height': 24,
      background: CSS.vars ['grey--lighter'],
      'border-radius': 100,
      transition: CSS.vars.easeOutQuart,
      'margin-left': 5,
   }, CSS.vars.cross ('.cross-button__cross', 10, CSS.vars.grey)],
   ['.cross-button--remove-tag:hover', {
      background: CSS.vars ['grey--light'],
   }, ['.cross-button__cross', CSS.vars.crossHover ()]],
   // *** fullscreen.scss ***
   // fullscreen
   ['.fullscreen', {
      position: 'fixed',
      'z-index': '10000',
      'height, width': 1,
      'top, left': 0,
      background: 'rgba(' + CSS.toRGBA (CSS.vars ['grey--darkest']) + ', 0.9)',
      color: CSS.vars.grey,
      'font-size': CSS.typography.fontSize (1),
      mixin1: CSS.vars.fontPrimaryMedium,
      display: 'flex',
      'justify-content, align-items': 'center',
      'overflow-y': 'auto',
      'pointer-events': 'none',
      opacity: '0',
      transition: CSS.vars.easeOutQuart
   }],
   ['.app-fullscreen .fullscreen', {
      opacity: '1',
      'pointer-events': 'all',
   }],
   // fullscreen Image
   ['.fullscreen__image-container', {
      position: 'absolute',
      'z-index': 0,
      'padding-top, padding-bottom, padding-left, padding-right': 70,
      'width, height': 1,
      display: 'flex',
      'align-items, justify-content': 'center',
   }],
   ['.fullscreen__image', {
      'object-fit': 'contain',
      'max-width, max-height': 1,
   }],
   // fullscreen - Elements
   ['.fullscreen__close, .fullscreen__date, .fullscreen__nav, .fullscreen__actions, .fullscreen__count', {
      position: 'absolute',
      'z-index': '1',
   }],
   ['.fullscreen__close', {
      'top, right': 10,
      display: 'flex',
      'align-items, justify-content': 'center',
      'height, width': 42,
      cursor: 'pointer',
   }],
   ['.fullscreen__close-icon', {
      display: 'inline-block',
      'width, height': 24,
      fill: CSS.vars.grey,
      transition: CSS.vars.easeOutQuart,
   }],
   ['.fullscreen__close:hover .fullscreen__close-icon', {fill: CSS.vars ['grey--lightest']}],
   ['.fullscreen__date', {
      top: 30,
      left: 0.5,
      transform: 'translateX(-50%)',
      display: 'inline-block',
   }],
   ['.fullscreen__nav', {
      position: 'absolute',
      top: 0.5,
      left: 24,
      transform: 'translateY(-50%)',
      display: 'inline-block',
      cursor: 'pointer',
   }],
   ['.fullscreen__nav--right', {
      left: 'auto',
      right: 24,
   }],
   ['.fullscreen__count', {
      bottom: 30,
      right: 24,
   }],
   ['.fullscreen__nav-icon', {
      display: 'inline-block',
      width: 13,
      height: 36,
      fill: CSS.vars.grey,
      transition: CSS.vars.easeOutQuart,
   }],
   ['.fullscreen__nav:hover .fullscreen__nav-icon', {fill: CSS.vars ['grey--lightest']}],
   ['.fullscreen__nav--left .fullscreen__nav-icon', {transform: 'scaleX(-1)'}],
   // fullscreen actions
   ['.fullscreen__actions', {
      bottom: 0,
      left: 0.5,
      height: 70,
      transform: 'translateX(-50%)',
      display: 'flex',
      'align-items': 'center',
   }],
   ['.fullscreen__action', {
      display: 'inline-flex',
      'flex-direction': 'column',
      'justify-content, align-items': 'center',
      cursor: 'pointer',
   }],
   ['.fullscreen__action-icon-container', {
      'border-radius': 100,
      'background-color': 'rgba(255, 255, 255, 0.05)',
      'height, width': 32,
      display: 'inline-flex',
      'align-items, justify-content': 'center',
      'margin-bottom': 2,
      transition: CSS.vars.easeOutQuart,
   }],
   ['.fullscreen__action:hover .fullscreen__action-icon-container', {'background-color': 'rgba(255, 255, 255, 0.1)'}],
   ['.fullscreen__action:active .fullscreen__action-icon-container', {'background-color': 'rgba(255, 255, 255, 0.05)'}],
   ['.fullscreen__action-icon', {
      display: 'inline-block',
      'width, height': 24,
      fill: CSS.vars ['grey--lightest'],
   }],
   ['.fullscreen__action-text', {
      color: CSS.vars.grey,
      'font-size': CSS.typography.fontSize (0),
   }],
   ['.fullscreen__action:hover .fullscreen__action-text', {color: CSS.vars ['grey--lightest']}],
];

// *** VIEWS OBJECT ***

var Views = {};

// *** LOGO ***

Views.logo = function (size) {
   return [
      ['link', {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Kadwa'}],
      ['span', {style: 'font-weight: bold; color: #BE5764; font-size: ' + size + 'px'}, 'ac;'],
      ['span', {style: 'font-weight: bold; color: black; font-size: ' + size + 'px'}, 'pic'],
   ];
}

// *** BASE VIEW ***

Views.base = function () {
   return B.view ('noRedraw', {listen: [
      ['notify', [], function (x, notify) {
         var existing = B.get ('State', 'notify');
         if (existing) clearTimeout (existing.timeout);
         var colors = {green: '#04E762', red: '#D33E43'};
         var timeout = setTimeout (function () {
            B.do (x, 'rem', 'State', 'notify');
         }, 4000);
         B.do (x, 'set', ['State', 'notify'], {color: colors [x.path [0]] || x.path [0], message: notify, timeout: timeout});
      }],
      [/get|post/, [], function (x, headers, body, cb) {
         // CSRF protection
         if (x.verb === 'post') body.csrf = B.get ('Data', 'csrf');
         var authRequest = x.path [0].match (/^auth/);
         // TODOv2 uncomment
         //if (authRequest) teishi.last (B.r.log).args [1] = 'OMITTED';
         c.ajax (x.verb, x.path [0], headers, body, ! cb ? undefined : function (error, rs) {
            if (! authRequest && x.path [0] !== 'csrf' && error && error.status === 403) {
               B.do (x, 'reset', 'store');
               return B.do (x, 'notify', 'red', 'Your session has expired. Please login again.');
            }
            if (cb) cb (x, error, rs);
         });
      }],
      ['error', [], function (x) {
         B.do (x, 'post', 'error', {}, dale.do (arguments, teishi.s).slice (1));
      }],
      ['load', 'hash', function (x) {
         var hash = window.location.hash.replace ('#/', '').split ('/');
         B.do (x, 'set', ['State', 'view'], hash [0]);
      }],
      ['change', ['State', 'view'], function (x) {
         if (! teishi.eq (x.path, ['State', 'view'])) return;

         var view = B.get ('State', 'view'), logged = B.get ('Data', 'csrf');

         var allowed = logged ? ['tag', 'upload', 'manage'] : ['login', 'signup', 'recover', 'reset'];

         if (allowed.indexOf (view) === -1) {
            if (! logged) B.do (x, 'set', ['State', 'redirect'], view);
            B.do (x, 'set', ['State', 'view'], allowed [0]);
            return;
         }

         document.title = ['ac;pic', view].join (' - ');

         if (window.location.hash.replace ('#/', '').split ('/') [0] !== view) window.location.hash = '#/' + view;
      }],
      ['reset', 'store', function (x) {
         B.do (x, 'set', 'State', {});
         B.do (x, 'set', 'Data',  {});
         window.State = B.get ('State'), window.Data = B.get ('Data');
      }],
      ['logout', [], function (x) {
         B.do (x, 'post', 'auth/logout', {}, '', function (error) {
            if (error) return B.do (x, 'notify', 'red', 'There was an error logging you out.');
            B.do (x, 'reset', 'store');
            B.r.log = [];
         });
      }],
      ['retrieve', 'csrf', function (x) {
         B.do (x, 'get', 'csrf', {}, '', function (x, error, rs) {
            if (error && error.status !== 403) return B.do (x, 'notify', 'red', 'Connection or server error.');
            B.do (x, 'set', ['Data', 'csrf'], error ? false : rs.body.csrf);
            // TODO fix redirect
            B.do (x, 'set', ['State', 'view'], B.get ('State', 'redirect') || (error ? 'login' : 'tag'));
         });
      }],
      // TODOv2 remove
      ['*', [], function (x) {
         clog (teishi.time () - T, x.verb, x.path, x.args);
      }],
   ], ondraw: function (x) {
      B.do (x, 'reset', 'store');
      B.do (x, 'load', 'hash');
      B.do (x, 'retrieve', 'csrf');
   }}, function () {
      return [
         ['style', CSS.litc],
         // TODOV2 merge nested views into one view
         B.view (['Data', 'csrf'], function (x, csrf) {
            if (csrf === undefined) return;
            return B.view (['State', 'view'], function (x, view) {
               if (Views [view]) return Views [view] ();
            });
         }),
      ];
   });
}

// *** LOGIN VIEW ***

Views.login = function () {
   return [
      ['style', [
         ['input', {'font-size': 24}],
         // *** enter ***
         ['.enter', {
            display: 'flex',
            'flex-direction': 'column',
            'justify-content, align-items': 'center',
            width: 1,
            'padding-top': CSS.typography.spaceVer (4),
            'padding-left, padding-right': CSS.vars ['padding--m'],
            'padding-bottom': CSS.typography.spaceVer (6),
         }],
         media ('screen and (max-width: 767px)', ['.enter', {'padding-top': CSS.typography.spaceVer (3)}]),
         ['.enter--signup', {'padding-top': CSS.typography.spaceVer (4)}],
         ['.enter__header', {'margin-bottom': CSS.typography.spaceVer (2)}],
         ['.enter__footer', {
            'margin-top': CSS.typography.spaceVer (1.5),
            'font-size': CSS.typography.fontSize (1),
            'line-height': CSS.typography.spaceVer (1),
            color: CSS.vars ['highlight-60'],
            'text-align': 'center',
         }],
         ['.enter__footer-link', {
            color: CSS.vars ['highlight-60'],
            transition: CSS.vars.easeOutQuart,
            'text-decoration': 'underline',
         }],
         media ('screen and (min-width: 1025px)', ['.enter__footer-link:hover', {color: CSS.vars ['color--one']}]),
         // *** enter-form ***
         ['.enter-form', {
            display: 'flex',
            'flex-direction': 'column',
            'justify-content': 'center',
         }],
         ['.enter-form__input', {
            'border, background': 'none',
            'border-bottom': '1px solid ' + CSS.vars.darkest,
            'font-size': 16,
            width: 1,
            'padding-top, padding-bottom': CSS.typography.spaceVer (1),
            'padding-left, padding-right': 2,
            color: CSS.vars ['highlight-100'],
            'margin-bottom': CSS.typography.spaceVer (0.5),
         }, ['&:focus', {'border-color': CSS.vars ['highlight-60']}]],
         media ('screen and (max-width: 767px)', ['.enter-form__input', {'min-width': 0}]),
         ['.enter-form__forgot-password', {
            color: CSS.vars ['highlight-60'],
            'font-size': CSS.typography.fontSize (1),
            'text-decoration': 'underline',
            transition: CSS.vars.easeOutQuart,
            'text-align': 'center',
            'margin-top': CSS.typography.spaceVer (1.5),
            'margin-bottom': CSS.typography.spaceVer (1),
         }],
         media ('screen and (min-width: 1025px)', ['.enter-form__forgot-password:hover', {color: CSS.vars ['color--one']}]),
         // Login form - Buttons
         ['.enter-form__button', {
            display: 'flex',
            'align-items, justify-content': 'center',
            height: 48,
            'font-size': 16,
            mixin1: CSS.vars.fontPrimaryMedium,
            border: 'none',
            outline: '0',
            'background-color': 'transparent',
            width: 1,
            'border-radius': 100,
            'margin-top': CSS.typography.spaceVer (1),
            transition: CSS.vars.easeOutQuart,
         }],
         media ('screen and (max-width: 767px)', ['.enter-form__button', {'font-size': CSS.typography.fontSize (2)}]),
         ['.enter-form__button-icon', {
            display: 'inline-block',
            'height, width': 20,
            'margin-right': CSS.vars ['padding--xs'],
         }],
         ['.enter-form__button--submit', {'margin-top': CSS.typography.spaceVer (1.5)}],
         // Login form - Button 1
         ['.enter-form__button--1', {
            'background-color': CSS.vars ['color--one'],
            color: CSS.vars ['highlight-100'],
         }],
         media ('screen and (min-width: 1025px)', [
            ['.enter-form__button--1:hover',  {'background-color': CSS.vars ['color--one']}],
            ['.enter-form__button--1:active', {'background-color': CSS.vars ['color--one'], opacity: '0.8'}],
         ]),
         // Login form - Button 2
         ['.enter-form__button--2', {
            border: CSS.vars ['color--one'] + ' 1px solid',
            color: CSS.vars ['color--one'],
         }],
         media ('screen and (min-width: 1025px)', [
            ['.enter-form__button--2:hover', {
               'background-color': CSS.vars ['color--one'],
               color: CSS.vars ['highlight-100'],
            }],
            ['.enter-form__button--2:active', {
               background: CSS.vars ['color--one'],
               opacity: '0.8',
            }],
         ]),
         // *** auth-card ***
         ['.auth-card', {
            width: 1,
            'max-width': 400,
         }],
         ['.auth-card__inner', {
            display: 'flex',
            'flex-direction': 'column',
            'justify-content': 'center',
            'background-color': CSS.vars ['highlight--selection'],
            'padding-top': CSS.typography.spaceVer (3),
            'padding-bottom': CSS.typography.spaceVer (3.5),
            'padding-left, padding-right': 60,
            'border-radius': CSS.vars ['border-radius--m'],
         }],
         media ('screen and (max-width: 767px)', ['.auth-card__inner', {
            'padding-top': CSS.typography.spaceVer (2.25),
            'padding-bottom': CSS.typography.spaceVer (2.5),
            'padding-left, padding-right': CSS.vars ['padding--xl'],
         }]),
         ['.auth-card__header', {
            width: 1,
            display: 'flex',
            'flex-direction': 'column',
            'justify-content, align-items': 'center',
            'margin-bottom': CSS.typography.spaceVer (2),
         }],
         ['.auth-card__header-logo', {
            'margin-bottom': CSS.typography.spaceVer (1),
            width: 200,
            height: 'auto',
         }],
         ['.auth-card__header-text', {
            'text-align': 'center',
            'font-size': CSS.typography.fontSize (3),
            'line-height': CSS.typography.spaceVer (1.5),
            color: CSS.vars ['highlight-60'],
            mixin1: CSS.vars.fontPrimaryRegular,
         }],
      ]],
      ['div', {class: 'enter'}, [
         ['div', {class: 'auth-card'}, [
            ['div', {class: 'auth-card__inner'}, [
               ['div', {class: 'auth-card__header'}, [
                  ['p', {class: 'auth-card__header-logo'}, Views.logo (28)],
                  ['p', {class: 'auth-card__header-text'}, 'A home for your pictures'],
               ]],
               B.view (['noRedraw'], {listen: [
                  ['submit', 'login', function (x) {
                     c.ajax ('post', 'auth/login', {}, {
                        username: c ('#auth-username').value,
                        password: c ('#auth-password').value,
                        tz:       new Date ().getTimezoneOffset ()
                     }, function (error, rs) {
                        if (error) return B.do (x, 'notify', 'red', 'Please submit valid credentials.');
                        B.do (x, 'set', ['Data', 'csrf'], rs.body.csrf);
                     });
                  }]
               ]}, function () {
                  return ['form', {onsubmit: 'event.preventDefault ()', class: 'enter-form auth-card__form'}, [
                     ['input', {id: 'auth-username', type: 'text', class: 'enter-form__input', placeholder: 'Username or email'}],
                     ['input', {id: 'auth-password', type: 'password', class: 'enter-form__input', placeholder: 'Password'}],
                     ['input', B.ev ({type: 'submit', class: 'enter-form__button enter-form__button--1 enter-form__button--submit', value: 'Log in'}, ['onclick', 'submit', 'login'])],
                     ['a', {href: '#/recover', class: 'enter-form__forgot-password'}, 'Forgot password?'],
                  ]];
               })
            ]]
         ]],
      ]],
   ];
}

// *** MAIN VIEW ***

Views.tag = function () {
   return B.view (['noRedraw'], {ondraw: function () {
      // TODOv2: use literals
      c.fill ('.logo__link', '<svg class="logo__img" enable-background="new 0 0 54 19" viewBox="0 0 54 19" xmlns="http://www.w3.org/2000/svg"><path d="m8.3 4.7v1.2c-.7-.9-1.8-1.5-3.3-1.5-2.6 0-4.8 2.3-4.8 5.3s2.3 5.3 4.9 5.3c1.5 0 2.5-.6 3.3-1.5v1.2h2.6v-10zm-2.8 7.8c-1.6 0-2.8-1.1-2.8-2.8s1.3-2.8 2.8-2.8 2.8 1.1 2.8 2.8-1.2 2.8-2.8 2.8zm12-.1c-1.5 0-2.7-1.1-2.7-2.7s1.1-2.7 2.7-2.7c1 0 1.9.5 2.3 1.3l2.2-1.3c-.8-1.5-2.5-2.6-4.5-2.6-3 0-5.3 2.3-5.3 5.3s2.2 5.3 5.3 5.3c2 0 3.7-1 4.5-2.6l-2.2-1.3c-.4.8-1.3 1.3-2.3 1.3zm7-8c-.9 0-1.7.8-1.7 1.7s.8 1.7 1.7 1.7 1.7-.8 1.7-1.7-.8-1.7-1.7-1.7zm0 7.2c-.9 0-1.7.8-1.7 1.7s.8 1.7 1.7 1.7 1.7-.8 1.7-1.7-.8-1.7-1.7-1.7zm9.3-7.2c-1.5 0-2.5.5-3.2 1.5v-1.2h-2.6v14h2.6v-5.2c.7.9 1.8 1.5 3.2 1.5 2.7 0 4.9-2.3 4.9-5.3s-2.2-5.3-4.9-5.3zm-.5 8.1c-1.6 0-2.8-1.1-2.8-2.8s1.2-2.8 2.8-2.8c1.5 0 2.7 1.1 2.7 2.8s-1.2 2.8-2.7 2.8zm7.9-12.2c-.9 0-1.6.7-1.6 1.6s.7 1.6 1.6 1.6 1.6-.7 1.6-1.6c0-.8-.7-1.6-1.6-1.6zm-1.2 4.4h2.6v10h-2.6zm11.5 6.4c-.4.8-1.3 1.3-2.3 1.3-1.5 0-2.7-1.1-2.7-2.7s1.1-2.7 2.7-2.7c1 0 1.9.5 2.3 1.3l2.2-1.3c-.8-1.5-2.5-2.6-4.5-2.6-3 0-5.3 2.3-5.3 5.3s2.2 5.3 5.3 5.3c2 0 3.7-1 4.5-2.6z" /></svg>');
      c.place ('.account-menu__item', 'afterBegin', '<svg class="account-menu__item-icon" enable-background="new 0 0 24 24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm0-1c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-2 2h4c1.7 0 3 1.3 3 3v1.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-1.5c0-1.7 1.3-3 3-3zm0 1c-1.1 0-2 .9-2 2v1.5c0 .3.2.5.5.5h7c.3 0 .5-.2.5-.5v-1.5c0-1.1-.9-2-2-2z"/></svg>');
   }}, function () {
      return ['div', {class: 'app-pictures'}, [
         // HEADER
         ['header', {class: 'header'}, [
            ['div', {class: 'header__brand'}, [
                ['div', {class: 'logo'}, [
                   ['a', {href: '#', class: 'logo__link opaque'}],
                ]],
             ]],
             // MAIN MENU
             ['div', {class: 'header__menu'}, [
                ['ul', {class: 'main-menu'}, [
                   ['li', {class: 'main-menu__item active'}, ['a', {href: '#', class: 'main-menu__item-link'}, 'View pictures']],
                   ['li', {class: 'main-menu__item'},        ['a', {href: '#', class: 'main-menu__item-link'}, 'Organise']],
                   ['li', {class: 'main-menu__item'},        ['a', {href: '#', class: 'main-menu__item-link'}, 'Manage tags']],
                ]]
             ]],
             // ACCOUNT MENU
             ['div', {class: 'header__user'}, [
                ['ul', {class: 'account-menu'}, [
                   ['li', {class: 'account-menu__item opaque'}, [
                      ['ul', {class: 'account-sub-menu'}, [
                         ['li', {class: 'account-sub-menu__item'}, ['a', {href: '#', class: 'account-sub-menu__item-link'}, 'My account']],
                         ['li', {class: 'account-sub-menu__item'}, ['a', B.ev ({href: '#', class: 'account-sub-menu__item-link'}, ['onclick', 'logout', []]), 'Logout']],
                      ]],
                   ]],
                ]],
             ]],
             // UPLOAD BUTTON
             ['div', {class: 'header__upload-button'}, ['a', {href: '#', class: 'button button--one'}, 'Upload']],
          ]],
       ]];
    });
}

// *** NATIVE EVENT LISTENERS ***

window.addEventListener ('hashchange', function () {
   B.do ('load', 'hash');
});

window.onerror = function () {
   B.do.apply (null, ['error', []].concat (dale.do (arguments, function (v) {return v})));
}

// *** INITIALIZATION ***

// TODOV2 remove
B.forget ('eventlog');

B.listen ('initialize', [], {burn: true}, function (x) {
   B.mount ('body', Views.base ());
});

B.do ('initialize', []);
