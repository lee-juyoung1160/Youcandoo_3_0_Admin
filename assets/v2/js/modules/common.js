
    import { modalOpen, modalContent, modalClose, modalBackdrop, loader } from "./elements.js";
    import { label } from "./label.js";

    export function fadeinModal()
    {
        modalContent.fadeIn();
        modalBackdrop.fadeIn();
    }

    export function fadeoutModal()
    {
        modalContent.fadeOut();
        modalBackdrop.fadeOut();
    }

    export function fadeinLoader()
    {
        loader.fadeIn(100);
    }

    export function fadeoutLoader()
    {
        loader.fadeOut(100);
    }

    export function onErrorImage(obj)
    {
        $(obj).attr('src', label.noImage);
    }
