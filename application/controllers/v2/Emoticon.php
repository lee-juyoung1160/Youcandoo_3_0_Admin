<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Emoticon extends MY_Controller {

    public function index()
    {
        $this->load->template('v2/emoticon/emoticon-list');
    }

    public function create()
    {
        $this->load->template('v2/emoticon/emoticon-create');
    }

    public function detail()
    {
        $this->load->template('v2/emoticon/emoticon-detail');
    }

    public function update()
    {
        $this->load->template('v2/emoticon/emoticon-update');
    }

}