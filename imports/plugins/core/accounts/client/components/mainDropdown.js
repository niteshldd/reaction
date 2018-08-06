import React, { Component } from "react";
import PropTypes from "prop-types";
import { Components } from "@reactioncommerce/reaction-components";
import Login from "./login";

const iconStyle = {
  margin: "10px 10px 10px 6px",
  width: "20px",
  fontSize: "inherit",
  textAlign: "center"
};

const menuStyle = {
  padding: "0px 10px 10px 10px",
  minWidth: 220,
  minHeight: 50
};

class MainDropdown extends Component {
  static propTypes = {
    currentAccount: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    handleChange: PropTypes.func,
    menuItems: PropTypes.arrayOf(PropTypes.shape({
      i18nKeyLabel: PropTypes.string,
      icon: PropTypes.string,
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    })),
    userImage: PropTypes.object,
    userName: PropTypes.string
  }

  buttonElement() {
    const { userImage, userName } = this.props;
    return (
      <Components.Button containerStyle={{ color: "#000", fontWeight: "normal", letterSpacing: 0.8 }}>
        <span className="main-dropdown-userImage">{userImage}</span>
        <span className="main-dropdown-userName">{userName}</span>&nbsp;
        <Components.Icon
          icon={"fa fa-caret-down"}
        />
      </Components.Button>
    );
  }

  renderMenuItems() {
    return (
      this.props.menuItems.map((option) => (
        <Components.MenuItem
          key={option.id}
          className="accounts-a-tag"
          label={option.label}
          i18nKeyLabel={option.i18nKeyLabel}
          icon={option.icon}
          iconStyle={iconStyle}
          value={option}
        />
      ))
    );
  }

  renderSignOutButton() {
    return (
      <Components.MenuItem
        className="btn btn-primary btn-block accounts-btn-tag"
        label="Sign out"
        value="logout"
      />
    );
  }

  renderSignInComponent() {
    return (
      <div className="accounts-dropdown">
        <div className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="1000">
          <span>
            <Components.Icon icon="fa fa-user" />
          </span>
          <b className="caret" />
        </div>
        <div
          className="accounts-dialog accounts-layout dropdown-menu pull-right"
          style={{ padding: "10px 20px" }}
        >
          <Login />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="accounts">
        {this.props.currentAccount ?
          <div style={{ paddingRight: 5 }}>
            <Components.DropDownMenu
              buttonElement={this.buttonElement()}
              attachment="bottom right"
              targetAttachment="top right"
              menuStyle={menuStyle}
              className="accounts-li-tag"
              onChange={this.props.handleChange}
              constraints={[{
                to: "window",
                attachment: "together"
              }]}
            >
              {this.renderMenuItems()}
              {this.renderSignOutButton()}
            </Components.DropDownMenu>
          </div>
          :
          <div className="accounts dropdown" role="menu">
            {this.renderSignInComponent()}
          </div>
        }
      </div>
    );
  }
}

export default MainDropdown;
