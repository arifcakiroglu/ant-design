// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import type { FullToken, GenerateStyle } from '../../_util/theme';
import { clearFix, genComponentStyleHook, mergeToken, resetComponent } from '../../_util/theme';
import genBorderedStyle from './bordered';
import genEllipsisStyle from './ellipsis';
import genExpandStyle from './expand';
import genFilterStyle from './filter';
import genFixedStyle from './fixed';
import genPagniationStyle from './pagination';
import genRadiusStyle from './radius';
import genRtlStyle from './rtl';
import genSelectionStyle from './selection';
import genSizeStyle from './size';
import genSorterStyle from './sorter';
import genStickyStyle from './sticky';
import genSummaryStyle from './summary';

export interface TableToken extends FullToken<'Table'> {
  tableFontSize: number;
  tableBg: CSSObject['background'];
  tableRadius: number;
  tablePaddingHorizontal: number;
  tablePaddingVertical: number;
  tableBorderColor: CSSObject['border-color'];
  tableHeaderTextColor: CSSObject['color'];
  tableHeaderBg: CSSObject['background'];
  tableFooterTextColor: CSSObject['color'];
  tableFooterBg: CSSObject['background'];
  tableHeaderCellSplitColor: CSSObject['border-color'];
  tableHeaderSortBg: CSSObject['background'];
  tableHeaderSortHoverBg: CSSObject['background'];
  tableHeaderIconColor: string;
  tableBodySortBg: CSSObject['background'];
  tableFixedHeaderSortActiveBg: CSSObject['background'];
  tableRowHoverBg: CSSObject['background'];
  tableSelectedRowBg: CSSObject['background'];
  tableSelectedRowHoverBg: CSSObject['background'];
  // FIXME: zIndexXxxx 统一提到一个地方
  zIndexTableFixed: number;
}

const genTableStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls } = token;
  const tableBorder = `${token.controlLineWidth}px ${token.controlLineType} ${token.tableBorderColor}`;
  return {
    [`${componentCls}-wrapper`]: {
      clear: 'both',
      maxWidth: '100%',
      ...clearFix(),

      [componentCls]: {
        ...resetComponent(token),

        fontSize: token.tableFontSize,
        background: token.tableBg,
        borderRadius: token.tableRadius,

        // https://github.com/ant-design/ant-design/issues/17611
        table: {
          width: '100%',
          textAlign: 'left',
          borderRadius: `${token.tableRadius}px ${token.tableRadius}px 0 0`,
          borderCollapse: 'separate',
          borderSpacing: 0,
        },

        // ============================= Cell =============================
        [`
          ${componentCls}-thead > tr > th,
          ${componentCls}-tbody > tr > td,
          tfoot > tr > th,
          tfoot > tr > td
        `]: {
          position: 'relative',
          padding: `${token.tablePaddingVertical}px ${token.tablePaddingHorizontal}px`,
          overflowWrap: 'break-word',
        },

        // ============================ Title =============================
        [`${componentCls}-title`]: {
          padding: `${token.tablePaddingVertical}px ${token.tablePaddingHorizontal}px`,
        },

        // ============================ Header ============================
        [`${componentCls}-thead`]: {
          '> tr > th': {
            position: 'relative',
            color: token.tableHeaderTextColor,
            fontWeight: 500,
            textAlign: 'left',
            background: token.tableHeaderBg,
            borderBottom: tableBorder,
            transition: `background ${token.motionDurationSlow} ease`,

            "&[colspan]:not([colspan='1'])": {
              textAlign: 'center',
            },

            [`&:not(:last-child):not(${componentCls}-selection-column):not(${componentCls}-row-expand-icon-cell):not([colspan])::before`]:
              {
                position: 'absolute',
                top: '50%',
                right: 0,
                width: 1,
                height: '1.6em',
                backgroundColor: token.tableHeaderCellSplitColor,
                transform: 'translateY(-50%)',
                transition: `background-color ${token.motionDurationSlow}`,
                content: '""',
              },
          },

          '> tr:not(:last-child) > th[colspan]': {
            borderBottom: 0,
          },
        },

        // ============================ Body ============================
        [`${componentCls}-tbody`]: {
          '> tr': {
            '> td': {
              borderBottom: tableBorder,
              transition: `background ${token.motionDurationSlow}`,

              // ========================= Nest Table ===========================
              [`
                > ${componentCls}-wrapper:only-child,
                > ${componentCls}-expanded-row-fixed > ${componentCls}-wrapper:only-child
              `]: {
                [componentCls]: {
                  margin: `-${token.tablePaddingVertical}px -${token.tablePaddingHorizontal}px -${
                    token.tablePaddingVertical
                  }px ${token.tablePaddingHorizontal + Math.ceil(token.fontSizeSM * 1.4)}px`,
                  [`${componentCls}-tbody > tr:last-child > td`]: {
                    borderBottom: 0,
                    '&:first-child, &:last-child': {
                      borderRadius: 0,
                    },
                  },
                },
              },
            },

            [`
              &${componentCls}-row:hover > td,
              > td${componentCls}-cell-row-hover
            `]: {
              background: token.tableRowHoverBg,
            },

            [`&${componentCls}-row-selected`]: {
              '> td': {
                background: token.tableSelectedRowBg,
                // FIXME
                borderColor: 'rgba(0, 0, 0, 0.03)',
              },

              '&:hover > td': {
                background: token.tableSelectedRowHoverBg,
              },
            },
          },
        },

        // ============================ Footer ============================
        [`${componentCls}-footer`]: {
          padding: `${token.tablePaddingVertical}px ${token.tablePaddingHorizontal}px`,
          color: token.tableFooterTextColor,
          background: token.tableFooterBg,
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Table', token => {
  // FIXME: missing tokens
  const tableSelectedRowBg = token.controlItemBgActive;
  const tableToken = mergeToken<TableToken>(token, {
    tableFontSize: token.fontSizeBase,
    tableBg: token.colorBgComponent,
    tableRadius: token.radiusBase,
    tablePaddingHorizontal: token.padding,
    tablePaddingVertical: token.padding,
    tableBorderColor: token.colorBorderSecondary,
    tableHeaderTextColor: token.colorTextHeading,
    tableHeaderBg: token.colorBgComponentSecondary,
    tableFooterTextColor: token.colorTextHeading,
    tableFooterBg: token.colorBgComponentSecondary,
    tableHeaderCellSplitColor: 'rgba(0, 0, 0, 0.06)',
    tableHeaderSortBg: token.colorBgComponent,
    tableHeaderSortHoverBg: 'rgba(0, 0, 0, 0.04)',
    tableHeaderIconColor: '#bfbfbf',
    tableBodySortBg: '#fafafa',
    tableFixedHeaderSortActiveBg: 'hsv(0, 0, 96%)',
    tableRowHoverBg: token.colorBgComponentSecondary,
    tableSelectedRowBg,
    tableSelectedRowHoverBg: new TinyColor(tableSelectedRowBg).darken(2).toString(),
    zIndexTableFixed: 2,
  });

  return [
    genTableStyle(tableToken),
    genPagniationStyle(tableToken),
    genSummaryStyle(tableToken),
    genSorterStyle(tableToken),
    genFilterStyle(tableToken),
    genBorderedStyle(tableToken),
    genRadiusStyle(tableToken),
    genExpandStyle(tableToken),
    genSummaryStyle(tableToken),
    genSelectionStyle(tableToken),
    genFixedStyle(tableToken),
    genStickyStyle(tableToken),
    genEllipsisStyle(tableToken),
    genSizeStyle(tableToken),
    genRtlStyle(tableToken),
  ];
});
