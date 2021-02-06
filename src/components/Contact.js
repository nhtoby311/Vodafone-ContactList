function Contact(props)
{
    return(
        <div className="d-flex flex-column col-md-5 col-lg-3 h-auto m-3 shadow bg-white p-0 text-center">
            <div className="h-50 w-100 bg-dark">
                <h1 className="my-h1">{props.name}</h1>
            </div>
            <p className="m-2 text-muted">{props.email}</p>
            <p className="m-2 text-muted">{props.phoneNumber}</p>
        </div>
    )
}

export default Contact