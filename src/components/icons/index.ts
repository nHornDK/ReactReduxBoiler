import React from 'react';
import { ReactComponent as DeleteSVG } from './delete.svg';
import { ReactComponent as EditSVG } from './edit.svg';
import WithSvgIcon from './WithSvgIcon';
import './with-svg-icon.scss';

export const DeleteIcon = React.memo(WithSvgIcon(DeleteSVG));
export const EditIcon = React.memo(WithSvgIcon(EditSVG));
