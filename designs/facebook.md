# Facebook Integration
This doc is just about capturing information.

In order to login to Facebook, we'll need to scope the request so we can see user's posts, `user_posts`.
[Scopes](https://developers.facebook.com/docs/permissions/reference#u).
Need to do see if devices is the best way to do this, [Devices](https://developers.facebook.com/docs/facebook-login/for-devices).
Or should I use the normal route and present a webpage with a login button [Login Button](https://developers.facebook.com/docs/facebook-login/web/login-button).

## Posts API
This API should not store any posts. Instead, it should dynamically convert a users's posts into the desired format.
The API will store only for non-facebook posts. 

### Post Mapping
Refernece: [Facebook Posts](https://developers.facebook.com/docs/graph-api/reference/post/).
Post page is broken

### Comment Mapping
References
- [Post Comments](https://developers.facebook.com/docs/graph-api/reference/post/comments/)
- [Comment Object](https://developers.facebook.com/docs/graph-api/reference/v12.0/comment)

Facebook Attribute | Our Attribute | Comment
--- | --- | ---
`id` | `__id` | 
`message` | `content` |
`created_time` | `date` |
`from.id` | `originator` | 

### Reaction Mapping
References
- [Post Reactions](https://developers.facebook.com/docs/graph-api/reference/post/reactions/)

Facebook Attribute | Our Attribute | Comment
--- | --- | ---
`type` | `type` | 
`id` | `originator` | 
