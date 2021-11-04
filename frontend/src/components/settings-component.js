
function SettingsComponent(props) {
    
    return (<div>
     <div className="page-heading">
        <h1 className="heading filled">Settings</h1>
    </div>
    
    <div className="page-content">
    
            <form className="form">
                {Object.keys(props.settings).map((key, index) => {
                    return (
                        <div className="form__group settings_group" key={index}>
                            <input type="text" className="form__input" placeholder={props.settings[key]} id={key} onChange={(e) => {props.onChange(e)}} />
                            <label htmlFor={key} className="form__label">{key}</label>
                        </div>
                        );
              })}
    
                 <div className="form__group">
                         <button className="form__button" onClick={(e) => props.onSave(e)}>save</button>
                 </div>
            </form> 
        </div>
    </div>);
}

export default SettingsComponent;

