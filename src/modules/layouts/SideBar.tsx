import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import "./styles/sidebar.scss";
import { profileStore } from '../profile/ProfileStore';

@observer
class SideBar extends Component {
    state = {
        link: ""
    };

    data: any = [
        {
            id: 0,
            role: "ADMIN",
            menu: [
                {
                    "id": 0,
                    "name": "Home",
                    "icon": "fas fa-user-friends",
                    "rootMenu": ['/profile', '/dashboard'],
                    "subMenu": [
                        {
                            "id": 0,
                            "name": "DashBoard",
                            "link": '/dashboard'
                        },
                        {
                            "id": 0,
                            "name": "Profile",
                            "link": '/profile'
                        }
                    ]
                },
                {
                    "id": 0,
                    "name": "User",
                    "icon": "fas fa-user-friends",
                    "rootMenu": ['/user'],
                    "subMenu": [
                        {
                            "id": 0,
                            "name": "UserList",
                            "link": '/user'
                        }
                    ]
                },
                {
                    "id": 0,
                    "name": "Account",
                    "icon": "fas fa-user-friends",
                    "rootMenu": ['/account'],
                    "subMenu": [
                        {
                            "id": 0,
                            "name": "Account",
                            "link": '/account'
                        }
                    ]
                },
                {
                    "id": 0,
                    "name": "Voucher",
                    "icon": "fas fa-user-friends",
                    "rootMenu": ['/voucher'],
                    "subMenu": [
                        {
                            "id": 0,
                            "name": "Voucher",
                            "link": '/voucher'
                        }
                    ]
                },
                {
                    "id": 0,
                    "name": "Order",
                    "icon": "fas fa-user-friends",
                    "rootMenu": ['/order'],
                    "subMenu": [
                        {
                            "id": 0,
                            "name": "Order",
                            "link": '/order'
                        }
                    ]
                },
                {
                    "id": 0,
                    "name": "Product",
                    "icon": "fas fa-user-friends",
                    "rootMenu": ['/product/category', '/product/color', '/product/size', '/product/export','/products'],
                    "subMenu": [
                        {
                            "id": 0,
                            "name": "Color",
                            "link": '/product/color'
                        },
                        {
                            "id": 0,
                            "name": "Size",
                            "link": '/product/size'
                        },
                        {
                            "id": 0,
                            "name": "Category",
                            "link": '/product/category'
                        },
                        {
                            "id": 0,
                            "name": "Export",
                            "link": '/product/export'
                        },
                        {
                            "id": 0,
                            "name": "Receipt",
                            "link": '/product/receipt'
                        },
                        {
                            "id": 0,
                            "name": "Brand",
                            "link": '/product/brand'
                        },
                        {
                            "id": 0,
                            "name": "Product",
                            "link": '/products'
                        }
                    ]
                },
            ]
        },
        {
            id: 0,
            role: "USER",
            menu: [
                {
                    "id": 0,
                    "name": "Home",
                    "icon": "fas fa-user-friends",
                    "rootMenu": ['/profile'],
                    "subMenu": [
                        {
                            "id": 0,
                            "name": "Profile",
                            "link": '/profile'
                        }
                    ]
                },
                {
                    "id": 0,
                    "name": "Account",
                    "icon": "fas fa-user-friends",
                    "rootMenu": ['/account'],
                    "subMenu": [
                        {
                            "id": 0,
                            "name": "Account",
                            "link": '/account'
                        }
                    ]
                },
                {
                    "id": 0,
                    "name": "Product",
                    "icon": "fas fa-user-friends",
                    "rootMenu": ['/product/category', '/product/color', '/product/size', '/product/export','/products'],
                    "subMenu": [
                        {
                            "id": 0,
                            "name": "Color",
                            "link": '/product/color'
                        },
                        {
                            "id": 0,
                            "name": "Size",
                            "link": '/product/size'
                        },
                        {
                            "id": 0,
                            "name": "Category",
                            "link": '/product/category'
                        },
                        {
                            "id": 0,
                            "name": "Export",
                            "link": '/product/export'
                        },
                        {
                            "id": 0,
                            "name": "Receipt",
                            "link": '/product/receipt'
                        },
                        {
                            "id": 0,
                            "name": "Product",
                            "link": '/products'
                        }
                    ]
                },
            ]
        },
    ];

    getRootPath() {
        const names = window.location.pathname.split("/");
        this.setState({link: "/" + names[1]});
        return "/" + names[1];
    }

    componentDidMount() {
        setTimeout(() => {
            this.getRootPath()
        })
    }

    render() {
        if (profileStore.getProfile) {
            const role = profileStore.getProfile.role;
            const itemByRoles = this.data.filter((index: any) => {
                return (index.role === role)
            });
            return (
                <nav className="sidebar sidebar-offcanvas" id="sidebar">
                    <ul className="nav">
                        <li className="profile">
                            <Link to={`/profile`} className="profile-wrapper">
                                {profileStore.getProfile?.avatarUrl ?
                                    <img className="avatar" src={profileStore.getProfile?.avatarUrl} alt="profile"/> :
                                    <button type="button" className="btn btn-primary avatar btn-social-icon btn-rounded">
                                        {profileStore.getProfile?.fullName.slice(0, 1).toUpperCase()}
                                    </button>
                                }
                                <div className="profile-details">
                                    <p className="name">{profileStore.getProfile?.fullName}</p>
                                    <small className="designation">{profileStore.getProfile?.role}</small>
                                </div>
                            </Link>
                        </li>
                        {itemByRoles[0].menu.map((item: any, i: any) => {
                            let navItem = "nav-item active ";
                            let collapse = "collapse ";
                            item.subMenu.map((child: any) => {
                                if (child.link === this.state.link || item.childMenu && child.childMenu.indexOf(this.state.link) >= 0) {
                                    collapse += "show"
                                }
                            })
                            return (
                                <li className={navItem} key={i}>
                                    { item.linkRouter ? 
                                        <Link to={item.linkRouter} className="nav-link w-100 d-flex justify-content-between align-items-center">
                                            <span className="menu-title">{item.name}</span>
                                            <i className="fal fa-angle-right"/>
                                        </Link> : 
                                        <a className="nav-link w-100 d-flex justify-content-between align-items-center"
                                            onClick={() => $(`#dasboards${i}`).slideToggle()}
                                        >
                                            <span className="menu-title">{item.name}</span>
                                            <i className="fal fa-angle-right"/>
                                        </a>
                                    }
                                    <div className={collapse} id={`dasboards${i}`}>
                                        <ul className="nav flex-column sub-menu">
                                            {item.subMenu && item.subMenu.map((item: any, i: any) => {
                                                let navLink = "nav-link"
                                                if (item.link === this.state.link || item.childMenu && item.childMenu.indexOf(this.state.link) >= 0) {
                                                    navLink = "nav-link active"
                                                }
                                                if (item.link.indexOf("http") !== -1) {
                                                    return (
                                                        <li className="nav-item " key={i} onClick={(e) => {
                                                            this.getRootPath()
                                                        }}>
                                                            <a href={item.link} target="_blank" className={navLink}>{item.name}</a>
                                                        </li>
                                                    );
                                                } else {
                                                    return (
                                                        <li className="nav-item " key={i} onClick={(e) => {
                                                            this.getRootPath()
                                                        }}>
                                                            <Link to={item.link} className={navLink} href="#">{item.name}</Link>
                                                        </li>
                                                    )
                                                }
                                            })}
                                        </ul>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            );
        } else return true
    }
}

export default SideBar;

