<?php
/**
 * Plugin Name: ALT LAB get posts shortcode
 * Plugin URI: https://github.com/woodwardtw/
 * Description: Shortcode to use JSON API to show posts from another site [get-posts="theurl.com" number="15"]

 * Version: 1.0
 * Author: Tom Woodward
 * Author URI: http://bionicteaching.com
 * License: GPL2
 */
 
 /*   2016 Tom  (email : bionicteaching@gmail.com)
 
    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.
 
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
 
    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */
 


function altlab_getposts_enqueue_scripts() {
    wp_enqueue_style( 'altlab-getposts-styles', plugins_url( '/css/altlab-getposts-styles.css', __FILE__ )  ); 
    wp_enqueue_script( 'altlab-getposts-scripts', plugins_url('/js/atlab-getposts-main.js', __FILE__), array( 'jquery' ), '1.0',true );

}
add_action( 'wp_enqueue_scripts', 'altlab_getposts_enqueue_scripts' );


 
function altlab_getpost_shortcode( $atts, $content = null ) {
    extract(shortcode_atts( array(
         'url' => '', //author id - sep multiple w commas       
         'display' => '', //defaults to list but grid with thumbnail featured images    
         'number' => ''   
    ), $atts));         

    if($url){
        $url = 'data-url="'.$url.'"';
    }    
    if($number){
        $num = 'data-num="'.$number.'"';
    } else {
        $num = 'data-num="10"';
    }
     if($display){
        $num = 'data-display="'.$display.'"';
    } else {
        $display = 'data-display="list"';
    }
    //$html = '<ul id="altlab-getposts" class="container" ' . $url . ' ' .  $num . ' ' . $display .'></ul>';
    $html = '<ul id="altlab-getposts" class="container" ' . $url . ' ' . $num . '></ul>';

    return  $html;
}

add_shortcode( 'get-posts', 'altlab_getpost_shortcode' );
