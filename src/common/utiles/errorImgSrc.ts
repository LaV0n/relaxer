export const errorImgSrc = (currentTarget: any) => {
   currentTarget.onerror = null
   return (currentTarget.src =
      'https://res.cloudinary.com/teepublic/image/private/s--UAjJNKmI--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1617971164/production/designs/20964411_0.jpg')
}
