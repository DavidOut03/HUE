import react from 'react';

function Sidebar() {
    return (<header>
        <div className="navigation">
            <input type="checkbox" name="cb" id="nav-toggle" className="navigation__checkbox"/>
            <label htmlFor="nav-toggle" className="navigation__button">
                <span className="navigation__icon"></span>
            </label>
    
            <nav className="nav">
                <div className="navigation__body">
                    <div className="navigation__content">
    
                  <h2 className="navigation__title">Menu</h2>
                    <ul className="navigation__list">
    
                        <li> <a href="/dashboard" className="navigation__item"> <box-icon className="navigation__item__icon" name='bulb' type='solid' color='#CCCCCC' ></box-icon>  <p className="navigation__text">Lights</p> </a> </li>
                        <li> <a href="/settings" className="navigation__item"> <box-icon className="navigation__item__icon" name='cog' type='solid' color='#CCCCCC' ></box-icon> <p className="navigation__text">Settings</p> </a> </li>
                    </ul>
                </div>
                </div> 
            </nav>
    
      </div>
    </header>);
    
}

export default Sidebar;