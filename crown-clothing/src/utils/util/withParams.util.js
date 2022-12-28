export const withParams = (Component, extraProps) => {
    return (props) => <Component {...props} {...extraProps()}/>
}