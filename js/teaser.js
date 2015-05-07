// teaser
// HAML Structure
//#teaser
//  .teaser-text-animation.active.first
//      %h3
//          %span.teaser-normal
//              First phrase part
//          %span.teaser-highlight
//              second phrase part
//  .teaser-text-animation
//      %h3
//          %span.teaser-normal
//              First phrase part
//          %span.teaser-highlight
//              second phrase part

$.fn.teaser = function (custom_opts, custom_classes) {
    var
        $this = this,
        opts = {},
        classes = {},
        default_opts = {
            interval: 4000,
            margin_px: '100',
            speed: 300
        },
        default_classes = {
            container: 'teaser-text-animation',
            active: 'active',
            first_text: 'teaser-normal',
            last_text: 'teaser-highlight'
        },
        items_count = 0,
        current_item_index = 0,
        next_item
        ;

    opts = jQuery.extend(default_opts, custom_opts);
    classes = jQuery.extend(default_classes, custom_classes);
    items_count = getTeaserItems().length;

    setInterval(animate, opts.interval);

    function getTeaserItems() {
        return $this.find('.' + classes.container);
    }

    function animate() {
        current_item_index++;
        if (current_item_index >= items_count) {
            current_item_index = 0;
            $('.' + classes.container).filter('.' + classes.active).fadeTo(opts.speed, 0, function () {
                getTeaserItems().removeClass(classes.active);
                changeTextCss();
                getTeaserItems().filter(':first').addClass(classes.active).fadeTo(opts.speed, 1, function () {
                    $('.' + classes.first_text + ', .' + classes.last_text + ', .' + classes.container + ':first').each(animate_item);
                });
            });
        }
        else {
            next_item = getTeaserItems().get(current_item_index);

            $('.' + classes.container).filter('.' + classes.active).fadeTo(opts.speed, 1, function () {
                getTeaserItems().removeClass(classes.active);
                changeTextCss();
                $(next_item).addClass(classes.active).fadeTo(opts.speed, 1, function () {
                    $('.' + classes.first_text + ', .' + classes.last_text, next_item).each(animate_item);
                })
            });
        }
    }

    function changeTextCss() {
        getTeaserItems().find('.' + classes.first_text).css({
            marginTop: opts.margin_px + 'px'
        });
        getTeaserItems().find('.' + classes.last_text).css({
            marginTop: '-' + opts.margin_px + 'px'
        });
    }

    function animate_item() {
        $(this).animate({
            marginTop: 0
        }, {
            duration: 400,
            queue: false
        });
    }

};