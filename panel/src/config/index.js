const WIDTH = 992; // refer to Bootstrap's responsive design

export const isMobile = () => {
    let rectWidth = document.documentElement.clientWidth || document.body.clientWidth;
    return rectWidth - 1 < WIDTH;
}