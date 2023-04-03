import { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AdminNavigatorProps, MenuProps, Submenu, SubMenuProps } from './AdminMenu';
import './AdminNavigatorStyle.scss';
import { withRouter } from './withRouter';

const MenuGroup = (props: { name: string; children: React.ReactNode }) => {
  const { name, children } = props;
  return (
    <li className="menu-group">
      <div className="menu-group-name">
        <FormattedMessage id={name} />
      </div>
      <ul className="menu-list list-unstyled">{children}</ul>
    </li>
  );
};

const Menu = (props: MenuProps) => {
  const { name, active, link, children, hasSubMenu } = props;
  return (
    <li className={'menu' + (hasSubMenu ? ' has-sub-menu' : '') + '' + (active ? ' active' : '')}>
      {hasSubMenu ? (
        <Fragment>
          <span
            data-toggle="collapse"
            className="menu-link collapsed d-flex align-items-center"
            aria-expanded={'false'}
          >
            <FormattedMessage id={name} />
            <div className="icon-right">
              <i className="fa-solid fa-angle-right"></i>
            </div>
          </span>
          <div>
            <ul className="sub-menu-list list-unstyled">{children}</ul>
          </div>
        </Fragment>
      ) : (
        <Link to={link} className="menu-link">
          <FormattedMessage id={name} />
        </Link>
      )}
    </li>
  );
};

const SubMenu = (props: SubMenuProps) => {
  const { name, link, router } = props;
  const getItemClass = (path: string) => {
    return router?.location.pathname === path ? 'active' : '';
  };
  return (
    <li className={`sub-menu ${getItemClass(link)}`}>
      <Link to={link} className="sub-menu-link">
        <FormattedMessage id={name} />
      </Link>
    </li>
  );
};

const AdminNavigator = (props: { menus: AdminNavigatorProps[] }) => {
  const { menus } = props;
  const location = useLocation();

  const MenuGroupWithRouter = withRouter(MenuGroup);
  const MenuWithRouter = withRouter(Menu);
  const SubMenuWithRouter = withRouter(SubMenu);

  const isMenuHasSubMenuActive = (
    location: { pathname: string },
    subMenus?: Submenu[],
    link?: string
  ) => {
    if (subMenus) {
      if (subMenus.length === 0) {
        return false;
      }

      const currentPath = location.pathname;
      for (let i = 0; i < subMenus.length; i++) {
        const subMenu = subMenus[i];
        if (subMenu.link === currentPath) {
          return true;
        }
      }
    }

    if (link) {
      return location.pathname === link;
    }

    return false;
  };

  return (
    <ul className="navigator-menu list-unstyled">
      {menus.map((group, groupIndex) => (
        <Fragment key={groupIndex}>
          <MenuGroupWithRouter name={group.name}>
            {group.menus
              ? group.menus.map((menu, menuIndex) => {
                  const active = isMenuHasSubMenuActive(location, menu.subMenus, menu.link);
                  return (
                    <MenuWithRouter
                      key={menuIndex}
                      active={active}
                      name={menu.name}
                      link={menu.link}
                      hasSubMenu={menu.subMenus}
                    >
                      {menu.subMenus &&
                        menu.subMenus.map((subMenu, subMenuIndex) => (
                          <SubMenuWithRouter
                            key={subMenuIndex}
                            name={subMenu.name}
                            link={subMenu.link}
                          />
                        ))}
                    </MenuWithRouter>
                  );
                })
              : null}
          </MenuGroupWithRouter>
        </Fragment>
      ))}
    </ul>
  );
};

export default AdminNavigator;
