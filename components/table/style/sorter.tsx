import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import type { GenerateStyle } from '../../_util/theme';
import type { TableToken } from './index';

const genSorterStyle: GenerateStyle<TableToken, CSSObject> = token => {
  const { componentCls } = token;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-thead th${componentCls}-column-has-sorters`]: {
        outline: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s',

        '&:hover': {
          background: token.tableHeaderSortHoverBg,

          '&::before': {
            backgroundColor: 'transparent !important',
          },
        },

        '&:focus-visible': {
          color: token.colorPrimary,
        },

        // https://github.com/ant-design/ant-design/issues/30969
        [`
          &${componentCls}-cell-fix-left:hover,
          &${componentCls}-cell-fix-right:hover
        `]: {
          background: token.tableFixedHeaderSortActiveBg,
        },
      },

      [`&-thead th${componentCls}-column-sort`]: {
        background: token.tableHeaderSortBg,

        '&::before': {
          backgroundColor: 'transparent !important',
        },
      },

      [`td${componentCls}-column-sort`]: {
        background: token.tableBodySortBg,
      },

      [`${componentCls}-column-title`]: {
        position: 'relative',
        zIndex: 1,
        flex: 1,
      },

      [`${componentCls}-column-sorters`]: {
        display: 'flex',
        flex: 'auto',
        alignItems: 'center',
        justifyContent: 'space-between',

        '&::after': {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          content: '""',
        },
      },

      [`${componentCls}-column-sorter`]: {
        marginLeft: '4px',
        color: token.tableHeaderIconColor,
        fontSize: 0,
        transition: 'color 0.3s',

        '&-inner': {
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
        },

        '&-up, &-down': {
          fontSize: '11px',

          '&.active': {
            color: token.colorPrimary,
          },
        },

        [`${componentCls}-column-sorter-up + ${componentCls}-column-sorter-down`]: {
          marginTop: '-0.3em',
        },
      },

      [`${componentCls}-column-sorters:hover ${componentCls}-column-sorter`]: {
        color: new TinyColor(token.tableHeaderIconColor).darken(10),
      },
    },
  };
};

export default genSorterStyle;
