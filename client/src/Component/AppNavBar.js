import React, {Component} from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Container,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class AppNavBar extends Component {
	constructor(props){
		super(props);
		this.state = {
			isOpen: false
		}
		this.toggle = this.toggle.bind(this);
	}

	toggle(){
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render(){
		return(
			<div>
				<Navbar color="dark" dark expand="medium" className="mb-5">
					<Container>
						<NavbarBrand href="/">ShoppingList</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<NavLink href="https://mydashi.herokuapp.com/">
										My DaShi
									</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</Container>
				</Navbar>

			</div>
		);
	}
}

export default AppNavBar;