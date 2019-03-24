import HttpHandler from '.';

const handle = async (request, response, ResolverFactory) => {
  const httpHandler = new HttpHandler({ request, response, ResolverFactory });

  await httpHandler.executeRouteResolver();
};

export default handle;
