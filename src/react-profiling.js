import { createContext, useContext, useRef, useState } from 'react'

const FormContext = createContext({});

const useField = (name) => {
    const manager = useContext(FormContext)
    const [internalValue, setInternalValue] = useState(manager.getValue(name));
    
    const handleChange = (value) => {
        const prevValue = manager.getValue(name)
        if(prevValue === value) {
            return
        }
        manager.onChange(name, value)
        setInternalValue(value)
    }
    

    return {
        value: internalValue,
        onChange: handleChange
    }
}

const TextField = ({ name, ...props }) => {
    // const {value, onChange} = useField(name)
    const {values: { [name]: value }, onChange} = useContext(FormContext)

    return (
        <div style={{
            margin: 8,
            padding: 8,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <label htmlFor={name}>{name}</label>
            {/* <input type="text" {...props} name={name} id={name} value={value || ''} onChange={e => onChange(e.target.value)} /> */}
            <input type="text" {...props} name={name} id={name} value={value || ''} onChange={e => onChange(name, e.target.value)} />

        </div>
    )
}

const TextFieldShield = (props) => {
    const {values: { [props.name]: value }, onChange} = useContext(FormContext)
    return <TextField {...props} value={value} onChange={onChange} />
}

const createStateManager = () => {
    const state = {}
    const onChange = (name, value) => {
        state[name] = value;
    }
    const getValue = (name) => state[name]?.value
    const getState = () => state
    return {
        getState,
        onChange,
        getValue,
    }
}

const ReactProfiling = () => {
    // const manager = useRef(createStateManager())
    const [state, setState] = useState({})
    function handleSubmit(values) {
        console.log({ values })
    }
    function handleChange(name, value) {
        setState(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <div>
            <h1>
                React profiling
            </h1>
            <div>
                {/* <FormContext.Provider value={manager.current}> */}
                <FormContext.Provider value={{values: state, onChange: handleChange}}>
                    <form noValidate onSubmit={e => {
                        e.preventDefault()
                        handleSubmit(state)
                        // handleSubmit(manager.current.getState())
                    }}>
                        {[...Array(2)].map((_, index) => <TextField key={`field-${index}`} name={`field-${index}`} />)}
                    </form>
                </FormContext.Provider>
            </div>
        </div>
    )
}

export default ReactProfiling;
