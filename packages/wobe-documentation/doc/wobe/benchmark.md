# Benchmarks

While performance isn't the primary focus of Wobe, it remains a significant factor in selecting a web framework. Let's explore how Wobe compares to other frameworks in terms of performance.

## Router

Wobe use a custom router based on the radix tree algorithm. Below are benchmarks comparing it with other popular routers. It's worth noting that the router's impact on overall application performance is typically minimal.

For this benchmark, we executed the router on multiple routes with various scenarios (simple routes, routes with the same radix, routes with parameters, wildcard routes, etc.). We used the same routes as Hono did in her benchmark. Here's the list of all routes used:

-   /user
-   /user/comments
-   /user/lookup/username/:username
-   /event/:id/comments
-   /event/:id/comments **(POST variant)**
-   /very/deeply/nested/route/hello/there
-   /static/\*

The results bellow correspond to the **total time** to found all the routes above.

| Router                                      | Time (in ns/iteration) |
| ------------------------------------------- | :--------------------: |
| Hono SmartRouter(RegExpRouter + TrieRouter) |         470 ns         |
| Radix3                                      |         882 ns         |
| Wobe Radix Router                           |         950 ns         |
| Find my way                                 |        1 154 ns        |
| Koa router                                  |        1 643 ns        |
| Hono TrieRouter                             |        4 560 ns        |

_Execute on a M1 Pro 10 CPU - 16 Gb Ram - 12/04/2024_

## Extracter of the pathname and the search params of the request

We also benchmark our function to extract the pathname and the query params from the request url.
For example in this url : `https://localhost:3000/user/username?id=123`, the pathname is `/user/username` and the query params are `id=123`.

The benchmark is based on multiple routes (short url, very long url, with and without parameters).
The results bellow correspond to the **total time** to extract the pathname and the query params from all the routes (6 routes in total).

| Extracter | Time (in ns/iteration) |
| --------- | :--------------------: |
| Wobe      |         523 ns         |
| Hono      |         601 ns         |

_Execute on a M1 Pro 10 CPU - 16 Gb Ram - 12/04/2024_

## HTTP Server benchmark

Now we will present the more meaningful benchmark, the HTTP server benchmark. We will compare Wobe with other popular web frameworks. The benchmark is based on the number of requests per second that the server can handle.