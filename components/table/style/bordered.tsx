import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { TableToken } from './index';

const genStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls } = token;
  const tableBorder = `${token.controlLineWidth}px ${token.controlLineType} ${token.tableBorderColor}`;

  const getSizeBorderStyle = (
    size: 'small' | 'middle',
    paddingVertical: number,
    paddingHorizontal: number,
  ) => ({
    [`&${componentCls}-${size}`]: {
      [`> ${componentCls}-container`]: {
        [`> ${componentCls}-content, > ${componentCls}-body`]: {
          '> table > tbody > tr > td': {
            [`> ${componentCls}-expanded-row-fixed`]: {
              margin: `-${paddingVertical}px -${paddingHorizontal + token.controlLineWidth}px`,
            },
          },
        },
      },
    },
  });

  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}${componentCls}-bordered`]: {
        // ============================ Title =============================
        [`> ${componentCls}-title`]: {
          border: tableBorder,
          borderBottom: '0',
        },

        // ============================ Content ============================
        [`> ${componentCls}-container`]: {
          borderLeft: tableBorder,

          [`
            > ${componentCls}-content,
            > ${componentCls}-header,
            > ${componentCls}-body,
            > ${componentCls}-summary
          `]: {
            '> table': {
              // ============================= Cell =============================
              [`
                > thead > tr > th,
                > tbody > tr > td,
                > tfoot > tr > th,
                > tfoot > tr > td
              `]: {
                borderRight: tableBorder,
              },

              // ============================ Header ============================
              '> thead': {
                '> tr:not(:last-child) > th': {
                  borderBottom: tableBorder,
                },

                '> tr > th::before': {
                  backgroundColor: 'transparent !important',
                },
              },

              // Fixed right should provides additional border
              [`
                > thead > tr,
                > tbody > tr,
                > tfoot > tr
              `]: {
                [`> ${componentCls}-cell-fix-right-first::after`]: {
                  borderRight: tableBorder,
                },
              },

              // ========================== Expandable ==========================
              '> table > tbody > tr > td': {
                [`> ${componentCls}-expanded-row-fixed`]: {
                  margin: `-${token.tablePaddingVertical}px -${
                    token.tablePaddingHorizontal + token.controlLineWidth
                  }px`,

                  '&::after': {
                    position: 'absolute',
                    top: '0',
                    right: token.controlLineWidth,
                    bottom: '0',
                    borderRight: tableBorder,
                    content: '""',
                  },
                },
              },
            },
          },

          [`
            > ${componentCls}-content,
            > ${componentCls}-header
          `]: {
            '> table': {
              borderTop: tableBorder,
            },
          },
        },

        // ============================ Scroll ============================
        [`&${componentCls}-scroll-horizontal`]: {
          [`> ${componentCls}-container > ${componentCls}-body`]: {
            '> table > tbody': {
              [`
                > tr${componentCls}-expanded-row,
                > tr${componentCls}-placeholder
              `]: {
                '> td': {
                  borderRight: '0',
                },
              },
            },
          },
        },

        // ============================ Size ============================
        ...getSizeBorderStyle(
          'middle',
          token.tablePaddingVerticalMiddle,
          token.tablePaddingHorizontalMiddle,
        ),
        ...getSizeBorderStyle(
          'small',
          token.tablePaddingVerticalSmall,
          token.tablePaddingHorizontalSmall,
        ),

        // ============================ Footer ============================
        [`> ${componentCls}-footer`]: {
          border: tableBorder,
          borderTop: '0',
        },

        // ============================ Nested ============================
        [`${componentCls}-cell`]: {
          [`${componentCls}-container:first-child`]: {
            // :first-child to avoid the case when bordered and title is set
            borderTop: '0',
          },

          // https://github.com/ant-design/ant-design/issues/35577
          '&-scrollbar:not([rowspan])': {
            boxShadow: `0 ${token.controlLineWidth} 0 ${token.controlLineWidth} ${token.tableHeaderBg}`,
          },
        },
      },
    },
  };
};

export default genStyle;
