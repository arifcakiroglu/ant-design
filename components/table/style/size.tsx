import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { TableToken } from './index';

const genStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls } = token;
  const getSizeStyle = (
    size: 'small' | 'middle',
    paddingVertical: number,
    paddingHorizontal: number,
    fontSize: number,
  ) => ({
    [`${componentCls}${componentCls}-${size}`]: {
      fontSize,
      [`
        ${componentCls}-title,
        ${componentCls}-footer,
        ${componentCls}-thead > tr > th,
        ${componentCls}-tbody > tr > td,
        tfoot > tr > th,
        tfoot > tr > td
      `]: {
        padding: `${paddingVertical}px ${paddingHorizontal}px`,
      },

      [`${componentCls}-filter-trigger`]: {
        marginRight: `-(${paddingHorizontal / 2}px`,
      },

      [`${componentCls}-expanded-row-fixed`]: {
        margin: `-${paddingVertical}px -${paddingHorizontal}px`,
      },

      [`${componentCls}-tbody`]: {
        // ========================= Nest Table ===========================
        [`${componentCls}-wrapper:only-child ${componentCls}`]: {
          margin: `-${paddingVertical}px -${paddingHorizontal}px -${paddingVertical}px ${
            paddingHorizontal + Math.ceil(token.fontSizeSM * 1.4)
          }px`,
        },
      },

      // https://github.com/ant-design/ant-design/issues/35167
      [`${componentCls}-selection-column`]: {
        paddingInlineStart: `${paddingHorizontal / 4}px`,
      },
    },
  });
  return {
    [`${componentCls}-wrapper`]: {
      ...getSizeStyle(
        'middle',
        token.tablePaddingVerticalMiddle,
        token.tablePaddingHorizontalMiddle,
        token.fontSizeBase,
      ),
      ...getSizeStyle(
        'small',
        token.tablePaddingVerticalSmall,
        token.tablePaddingHorizontalSmall,
        token.fontSizeSM,
      ),
    },
  };
};

export default genStyle;
