import React, { JSX } from 'react';
import styled from 'styled-components';

interface ModalBoxProps {
	active: boolean;
}

const ModalBox = styled.div<ModalBoxProps>`
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	transform: ${({ active }) => (active ? 'scale(1)' : 'scale(0)')};
`;
const ModalContent = styled.div`
	padding: 30px;
	border-radius: 5px;
	background-color: #fff;
`;

interface ModalProps {
	active: boolean;
	setActive: (visible: boolean) => void;
	children?: string | JSX.Element | JSX.Element[];
}
const Modal: React.FC<ModalProps> = ({ active, setActive, children }) => {
	return (
		<ModalBox
			active={active}
			onClick={() => {
				setActive(false);
			}}
		>
			<ModalContent onClick={(e) => e.stopPropagation()}>{children}</ModalContent>
		</ModalBox>
	);
};

export default Modal;
